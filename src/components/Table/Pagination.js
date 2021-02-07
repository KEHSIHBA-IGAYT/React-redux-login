import React, { useState, useEffect } from 'react';
import PageStrip from "react-bootstrap/Pagination";

const Pagination = ({ page, totalPages, onPageClick }) => {

    const [items, setItems] = useState([]);

    const prepareStrip = () => {

        let itemsArr = [];
        // Check previous button display
        if (page !== 1) {
            itemsArr.push(
                <PageStrip.Item
                    key={page - 1}
                    onClick={() => {
                        onPageClick(page - 1);
                    }}
                >
                    PREV
          </PageStrip.Item>
            );
        }

        // Create pagination links
        for (let number = page; number <= totalPages; number++) {
            if (itemsArr.length <= 5 && number !== page) {
                itemsArr.push(
                    <PageStrip.Item
                        key={number}
                        onClick={() => {
                            onPageClick(number);
                        }}
                    >
                        {number}
                    </PageStrip.Item>
                );
            }
        }

        // Check next button display
        if (page < totalPages) {
            itemsArr.push(
                <PageStrip.Item
                    key={page + 5}
                    onClick={() => {
                        onPageClick(page + 1);
                    }}
                >
                    NEXT
                      </PageStrip.Item>
            );
        }
        setItems(itemsArr);

    }


    useEffect(() => {
        prepareStrip();
    }, [page]);


    return (
        <PageStrip size="sm">{items}</PageStrip>
    )

};

export default Pagination;