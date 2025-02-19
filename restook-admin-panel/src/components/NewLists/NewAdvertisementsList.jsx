import React, { useContext, useEffect } from "react";

import { Button, Card, Col, Input, Table, DatePicker, Pagination } from "antd";
import QuickAccess from "./QuickAccess";

import { ReactComponent as Arrow } from "../../assets/images/home-page/Chevron - Left.svg";
import { ReactComponent as Calender } from "../../assets/images/home-page/Calendar - Dates (1).svg";
import { ReactComponent as BackIcon } from "../../assets/images/home-page/Arrow - Right.svg";
import { sortIcon } from "../../utils/tableIconSort";
import useTableData from "../../hooks/useTableData";
import { getTableData } from "../../services/getTableData";
import ImageWithFallback from "../Common/ImageWithFallback";
import { UserContext } from "../../store/UserContextProvider";
import { InputDatePicker } from "jalaali-react-date-picker";

const NewAdvertisementsList = () => {
    const { userPlace } = useContext(UserContext);

    const {
        pageFilter,
        tableData,
        totalPage,
        sortMode,
        currentPage,
        selectedDate,
        isDateOpen,
        calendarRef,
        sortTable,
        handleInputChange,
        setTableData,
        setTotalPage,
        backBtnHandler,
        handleDateChange,
        handleOpenChange,
        handlePageChange,
    } = useTableData();

    const columns = [
        {
            title: "",
            dataIndex: "imageUrl",
            key: "imageUrl",
            width: "10.1%",
            render: (_, record, index) =>
                index !== 0 &&
                (record.imageUrl ? (
                    <ImageWithFallback
                        imageUrl={record.imageUrl}
                        className={"table-image"}
                        alt={"table-image"}
                    />
                ) : (
                    <div className="gray-circle"></div>
                )),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("restaurantTitle", sortMode)}
                    onClick={() => sortTable("restaurantTitle")}
                >
                    نام مجموعه
                </Button>
            ),
            dataIndex: "restaurantTitle",
            key: "restaurantTitle",
            width: "27%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) => {
                            handleInputChange(e, record.key, "restaurantTitle");
                            console.log(e.target.value);
                        }}
                    />
                ) : (
                    text
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("jobTitle", sortMode)}
                    onClick={() => sortTable("jobTitle")}
                >
                    عنوان آگهی
                </Button>
            ),
            dataIndex: "jobTitle",
            key: "jobTitle",
            width: "19.67%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "jobTitle")
                        }
                    />
                ) : text ? (
                    text
                ) : (
                    "_"
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("phoneNumber", sortMode)}
                    onClick={() => sortTable("phoneNumber")}
                >
                    شماره تماس
                </Button>
            ),
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            width: "21.08%",
            render: (text, record, index) =>
                index === 0 ? (
                    <Input
                        value={record.address}
                        onChange={(e) =>
                            handleInputChange(e, record.key, "phoneNumber")
                        }
                    />
                ) : (
                    text
                ),
        },
        {
            title: (
                <Button
                    type="text"
                    icon={sortIcon("createdAt", sortMode)}
                    onClick={() => sortTable("createdAt")}
                >
                    تاریخ ثبت
                </Button>
            ),
            dataIndex: "date",
            key: "date",
            width: "14.15%",
            render: (text, record, index) =>
                index === 0 ? (
                    <InputDatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        format="jYYYY-jMM-jDD"
                        open={isDateOpen}
                        onOpenChange={handleOpenChange}
                        ref={calendarRef}
                    />
                ) : (
                    text
                ),
        },
        {
            title: "",
            dataIndex: "details",
            key: "details",
            render: (_, record, index) => {
                if (index !== 0) {
                    return (
                        <Button
                            type="text"
                            icon={<Arrow />}
                            iconPosition={"end"}
                            className="details-btn"
                        >
                            جزئیات
                        </Button>
                    );
                }
            },
        },
    ];

    useEffect(() => {
        const getData = async () => {
            const res = await getTableData(
                "advertisements",
                pageFilter,
                currentPage,
                false
            );

            setTableData(res[0]);
            setTotalPage(res[1]);
        };

        getData();
    }, [pageFilter, currentPage]);

    return (
        <>
            {userPlace === "home-page" && <QuickAccess />}

            <Col span={24} className="table-section">
                <Card
                    title={
                        <>
                            {userPlace !== "home-page" && (
                                <span
                                    onClick={backBtnHandler}
                                    className="back-arrow-btn"
                                >
                                    <BackIcon />
                                </span>
                            )}

                            <span>لیست آگهی جدید</span>
                        </>
                    }
                >
                    <Table
                        loading={!totalPage}
                        dataSource={tableData}
                        columns={columns}
                        pagination={false}
                        rowKey={(record) => record.id}
                    />
                    <Pagination
                        // showLessItems={true}
                        total={10 * totalPage}
                        disabled={!totalPage}
                        onChange={handlePageChange}
                    />
                </Card>
            </Col>
        </>
    );
};

export default NewAdvertisementsList;
