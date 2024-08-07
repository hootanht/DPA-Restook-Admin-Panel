import React, { useContext, useEffect, useState } from "react";
import { Button, Col, ConfigProvider, Flex, Form, Input, Row } from "antd";
import { ReactComponent as UserNameIcon } from "../assets/images/login/User.svg";
import { ReactComponent as PasswordIcon } from "../assets/images/login/Lock.svg";
import { ReactComponent as RestookLogo } from "../assets/images/login/Restook Logo.svg";
import { login } from "../services/apiService";
import { AuthContext } from "../store/AuthContextProvider";
import { CommonContext } from "../store/CommonContextProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        phoneNumber: "09901283916",
        password: "",
    });
    const [pageLoginMode, setPageLoginMode] = useState(true);
    const [OTPCode, setOTPcode] = useState("");
    const [isForgetFormSubmit, setIsForgetFormSubmit] = useState(false);
    const [sendAgainCounter, setSendAgainCounter] = useState(0);

    const { setUserData } = useContext(AuthContext);
    const { setToastifyObj, setLocalToken } = useContext(CommonContext);

    const navigate = useNavigate();

    const loginFormSubmit = async () => {
        try {
            console.log("formData >>", formData);

            const res = await login(formData);

            if (res.success) {
                console.log("login_data >>", res.data);

                setUserData(() => ({
                    access_token: res.data.access_token,
                    user: res.data.user,
                }));

                setLocalToken(res.data.access_token);

                setToastifyObj(() => ({
                    title: `سلام ${res.data.user.firstName} خوش اومدی!`,
                    mode: "success",
                }));

                navigate("/home-page");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("ERROR in formSubmit >>", error);

            setToastifyObj(() => ({
                title: "شماره تلفن یا رمز اشتباه است",
                mode: "error",
            }));
        }
    };

    const inputChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const forgetPassBtn = () => {
        console.log("forgetPassBtn");
        const regex = /^\d{11}$/;

        if (!!!formData.phoneNumber.length) {
            setToastifyObj(() => ({
                title: "لطفا شماره تلفن را وارد کنید",
                mode: "error",
            }));
        } else {
            if (regex.test(formData.phoneNumber)) {
                setPageLoginMode(false);
                // Send Code
            } else {
                setToastifyObj(() => ({
                    title: "لطفا شماره تلفن را درست وارد کنید",
                    mode: "error",
                }));
            }
        }
    };

    const onChange = (text) => {
        console.log("onChange:", text);
        setOTPcode(text);
    };

    const sharedProps = {
        onChange,
    };

    const forgetFormSubmit = () => {
        console.log("forgetFormSubmit");
        setIsForgetFormSubmit(true);

        console.log(OTPCode);
    };

    useEffect(() => {
        let interval;
        if (sendAgainCounter > 0) {
            interval = setInterval(() => {
                setSendAgainCounter((prevCounter) => {
                    if (prevCounter > 0) {
                        return prevCounter - 1;
                    } else {
                        clearInterval(interval);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [sendAgainCounter]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const sendAgainHandler = () => {
        setSendAgainCounter(120);
        // Send Code
    };

    return (
        <div className="login-page">
            <Row className="loginSection">
                <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 24, order: 2 }}
                    md={{ span: 13, order: 1 }}
                    className="rightSide"
                >
                    {pageLoginMode ? (
                        <div className="login-mode">
                            <div className="sectionHeader">ورود</div>
                            <Form
                                name="login"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={loginFormSubmit}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="phoneNumber"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "لطفا شماره تماس خود را وارد کنید",
                                        },
                                    ]}
                                >
                                    <Input
                                        value={formData.phoneNumber}
                                        onChange={(e) => inputChangeHandler(e)}
                                        suffix={<UserNameIcon />}
                                        name="phoneNumber"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "لطفا رمز خود را وارد کنید",
                                        },
                                    ]}
                                >
                                    <Input
                                        type="password"
                                        suffix={<PasswordIcon />}
                                        value={formData.password}
                                        onChange={(e) => inputChangeHandler(e)}
                                        name="password"
                                    />
                                </Form.Item>

                                <Form.Item />

                                <Form.Item>
                                    <Flex justify="space-between" gap={10}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="submit-btn"
                                        >
                                            ورود
                                        </Button>
                                        <Button
                                            type="link"
                                            className="forget-pass"
                                            onClick={forgetPassBtn}
                                        >
                                            رمز عبور خود را فراموش کرده‌اید؟
                                        </Button>
                                    </Flex>
                                </Form.Item>
                            </Form>
                        </div>
                    ) : (
                        <div className="forgot-pass-mode">
                            <div className="confirmHeader">کد تأیید</div>

                            <Form
                                name="forgot-pass"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={forgetFormSubmit}
                                autoComplete="off"
                                layout="vertical"
                                requiredMark={false}
                            >
                                <Form.Item
                                    name="otpCode"
                                    label={`کد 5 رقمی ارسال شده به ${formData.phoneNumber} را وارد کنید`}
                                    help={
                                        OTPCode.length !== 5 &&
                                        isForgetFormSubmit
                                            ? "لطفا کد ارسال شده را وارد کنید"
                                            : ""
                                    }
                                >
                                    <ConfigProvider direction="ltr">
                                        <Input.OTP
                                            dir="ltr"
                                            length={5}
                                            {...sharedProps}
                                            size="large"
                                        />
                                    </ConfigProvider>
                                </Form.Item>

                                <Form.Item>
                                    <Flex justify="space-between" gap={10}>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="submit-btn"
                                        >
                                            ورود
                                        </Button>
                                        <Button
                                            type="link"
                                            className="forget-pass"
                                            onClick={sendAgainHandler}
                                            disabled={sendAgainCounter}
                                        >
                                            {sendAgainCounter ? (
                                                <>
                                                    دریافت مجدد کد در
                                                    <span className="time-span">
                                                        {formatTime(
                                                            sendAgainCounter
                                                        )}
                                                    </span>
                                                    دیگر
                                                </>
                                            ) : (
                                                "دریافت مجدد کد"
                                            )}
                                        </Button>
                                    </Flex>
                                </Form.Item>
                            </Form>
                        </div>
                    )}
                </Col>

                <Col
                    xs={{ span: 24, order: 1 }}
                    sm={{ span: 24, order: 1 }}
                    md={{ span: 11, order: 2 }}
                    className="leftSide"
                >
                    <RestookLogo />
                </Col>
            </Row>
        </div>
    );
};

export default Login;
