import React from 'react';

export default function ColumnHeader({ children, className, title, id, expected, click, pg }) {
    const classNames = "rowt " + id + (className ?  ' ' + className : '');
    if (id === expected) {
        if (click) {
            return ( // <></>;
                <th className={classNames} data-title={title} style={{ display: 'table-cell' }} onClick={(e) => click(e, {id}, {pg})} >
                    {children}
                </th>
            )
        } else {
            return ( // <></>;
                <th className={classNames} data-title={title} style={{ display: 'table-cell' }}>
                    {children}
                </th>
            )    
        }
    } else {
        return null
    }
}
