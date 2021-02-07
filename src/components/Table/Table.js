import React from 'react';
import { useHistory } from "react-router-dom";

//css
import './table.css';

const Table = ({ columns, data }) => {

    const history = useHistory();

    const showUser = (id) => {
        history.push(`/users/${id}`);
    }

    const renderedHeader = columns.map((column, index) => {
        return (
            <th key={index}>{column}</th>
        );
    });

    const renderedTable = data.map((row, index) => {
        return (
            <tr onClick={() => showUser(row.id)} key={index}>
                <td>{row.id}</td>
                <td>{row.email}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td><img src={row.avatar} alt={row.avatar} width="50px"></img></td>
            </tr>
        );
    });


    return (
        <table>
            <thead>
                <tr>
                    {renderedHeader}
                </tr>
            </thead>
            <tbody>
                {renderedTable}
            </tbody>
        </table>
    )
};

export default Table;