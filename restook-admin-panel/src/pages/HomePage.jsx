import React, { useContext, useEffect } from "react";
import { Row, Spin } from "antd";
import { AuthContext } from "../store/AuthContextProvider";
import NewAdvertisements from "../components/NewAdvertisements";
import NewRestaurants from "../components/NewRestaurants";
import NewUsers from "../components/NewUsers";
import { UserContext } from "../store/UserContextProvider";
import PageWrapper from "../components/PageWrapper";

const HomePage = () => {
    const { userPlace, setUserPlace } = useContext(UserContext);
    const { userData } = useContext(AuthContext);

    const pageMode = () => {
        switch (userPlace) {
            case "default":
            case "home-page":
            case "new-advertisements":
                return <NewAdvertisements />;
            case "new-restaurants":
                return <NewRestaurants />;
            case "new-users":
                return <NewUsers />;
            default:
                console.log("ERROR IN HomePage-pageMode", userPlace);
        }
    };

    useEffect(() => {
        if (userPlace === "default") {
            setUserPlace("home-page");
        }
    }, [userPlace, setUserPlace]);

    return (
        <PageWrapper>
            {userData.access_token.length ? (
                <Row gutter={[24, 24]} className="content">
                    {pageMode()}
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </PageWrapper>
    );
};

export default HomePage;
