const Table = ({ data, columns }) => {
    return (
        <div className="table">
            <table>
                {
                    data.map((item, id) => {
                        return (
                            <tr key={id}>
                                {
                                    columns.map((column, id) => {
                                        return (
                                            <td key={id}>
                                                {
                                                    item[column.name]
                                                }
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    );
}

export default Table;