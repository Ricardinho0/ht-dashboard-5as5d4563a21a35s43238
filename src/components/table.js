
import React from "react";
import { Col, Row, Card, Form } from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import Pagination, { PaginationListStandalone, PaginationProvider, SizePerPageDropdownStandalone } from "react-bootstrap-table2-paginator";
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

const Table = ({ columns, data, totalSize, onPageSizeChange, perPage, page, onPageChange }) => {

    const customTotal = (from, to, size) => (
        <div>
            {from} - {to} de {size}
        </div>
    );

    const customSizePerPage = (props) => {
        const { options, currentSizePerPage, onSizePerPageChange } = props;

        const onPageChange = (e) => {
            const page = e.target.value;
            onSizePerPageChange(page);
            onPageSizeChange && onPageSizeChange(page)
        }

        return (
            <Row as="label">
                <Col xs="auto">
                    <Form.Select value={currentSizePerPage} onChange={onPageChange} className="pe-5">
                        {[100, 500, 1000, 5000].map(o => (
                            <option key={o} value={o}>
                                {o}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col xs="auto" className="d-flex align-items-center ps-0">
                    Resultado por página
                </Col>
            </Row>
        );
    };

    return (
        <ToolkitProvider
            keyField="id"
            search={true}
            columns={columns}
            data={data}
        >
            {({ baseProps, searchProps }) => (
                <PaginationProvider pagination={
                    Pagination({
                        custom: true,
                        showTotal: true,
                        alwaysShowAllBtns: true,
                        totalSize: totalSize ?? 0,
                        withFirstAndLast: false,
                        paginationTotalRenderer: customTotal,
                        sizePerPageRenderer: customSizePerPage,
                        sizePerPage: perPage ?? 100,
                        page: page,
                        onPageChange:(page) => onPageChange(page)
                    })
                }>
                    {({ paginationProps, paginationTableProps }) => (
                        <Card>
                            <div className="table-responsive py-4">
                                <div className="dataTable-top">
                                    <div className="dataTable-dropdown">
                                        <SizePerPageDropdownStandalone
                                            custom={true}
                                            {...paginationProps} />
                                    </div>
                                    {/* <div className="dataTable-search">
                                        <PaginationListStandalone {...paginationProps} />
                                    </div> */}
                                </div>

                                <BootstrapTable
                                    {...baseProps}
                                    {...paginationTableProps}
                                    headerWrapperClasses="thead-light"
                                    bodyClasses="border-0"
                                    rowClasses="border-bottom"
                                    classes="table-flush dataTable-table"
                                />
                            </div>
                        </Card>
                    )}
                </PaginationProvider>
            )}
        </ToolkitProvider>
    )
}

export default Table;