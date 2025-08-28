import React from 'react';

export default function Column({ children, className, title, id, expected }) {
    if (id === expected) {
        return ( // <></>;
            <td className={className} data-title={title} style={{ display: 'table-cell' }}>
                {children}
            </td>
        )
    } else {
        return null
    }
}
