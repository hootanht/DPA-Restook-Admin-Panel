import React, { useContext, useEffect, useState } from "react";
import PageWrapper from "../components/Common/PageWrapper";
import { Col, Row, Spin } from "antd";
import { UserContext } from "../store/UserContextProvider";
import { AuthContext } from "../store/AuthContextProvider";
import { useParams } from "react-router-dom";
import { getRequest } from "../services/apiService";

import AdvertReviewFirstCard from "../components/AdvertReview/AdvertReviewFirstCard";
import AdvertReviewInfo from "../components/AdvertReview/AdvertReviewInfo";
import AdvertReviewConditions from "../components/AdvertReview/AdvertReviewConditions";
import AdvertReviewAdvantages from "../components/AdvertReview/AdvertReviewAdvantages";

const AdvertisementReview = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const { id } = useParams();
    const [advertData, setAdvertData] = useState();

    useEffect(() => {
        if (id) {
            console.log("id >>", id);

            const getData = async () => {
                const res = await getRequest(`/advertisements/${id}`);

                console.log("Advert-Prof >>", res);

                if (res.success) {
                    setAdvertData(res.data);
                } else {
                    console.log(`ERROR in /restaurants/${id}`);
                }
            };

            getData();
        }
    }, [id]);

    return (
        <PageWrapper>
            {userData.access_token.length && advertData ? (
                <Row gutter={[24, 24]} className="content advert-review">
                    <Col span={24} className="table-section">
                        <AdvertReviewFirstCard advertData={advertData} />
                        <AdvertReviewInfo advertData={advertData} />
                        <AdvertReviewConditions advertData={advertData} />
                        <AdvertReviewAdvantages advertData={advertData} />
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default AdvertisementReview;
