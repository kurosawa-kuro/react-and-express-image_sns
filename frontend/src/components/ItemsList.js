// src/components/ItemsList.js
import React from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchItems } from "../services/api";
import AddItemForm from "./AddItemForm";

const ItemsList = () => {
    const { data: items, isLoading, isError } = useQuery(["items"], fetchItems);
    const queryClient = useQueryClient();

    const handleNewItem = () => {
        // Invalidate the items query to trigger a refetch
        queryClient.invalidateQueries(["items"]);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error fetching items</p>;
    }

    return (
        <div>
            <AddItemForm onNewItem={handleNewItem} />
            <ul>
                {items.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ItemsList;
