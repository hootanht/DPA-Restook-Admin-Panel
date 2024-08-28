import React, { useState, useEffect, useContext } from "react";
import { getRequest } from "../services/apiService";
import { UserContext } from "../store/UserContextProvider";
import { ReactComponent as BackIcon } from "../assets/images/home-page/Arrow - Right.svg";

import {
    Button,
    Card,
    Col,
    Input,
    Table,
    Pagination,
    Select,
    Row,
    Spin,
    DatePicker,
    Form,
    Radio,
    Switch,
    Typography,
    Flex,
} from "antd";
import ImageWithFallback from "./ImageWithFallback";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;
const { Text } = Typography;

const ExternalAdvertProfile = () => {
    const [form] = Form.useForm();
    const [apiResponse, setApiResponse] = useState(null);
    const [profileImg, setProfileImg] = useState();
    const { userPlace, setUserPlace } = useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getRequest(
                    `/temp/tempAdDetail?id=${userPlace.match(/\d+/g)}`
                );

                if (res && res.success) {
                    console.log("Profile Data >>", res.data);
                    setApiResponse(res.data);
                } else {
                    throw new Error("Error in ExternalAdvertProfile: getData");
                }
            } catch (error) {
                console.log("ERROR in ExternalAdvertProfile getData>>", error);
            }
        };

        getData();
    }, [userPlace]);

    useEffect(() => {
        if (apiResponse) {
            const { restaurant, advertisement } = apiResponse;

            setProfileImg(restaurant.imageUrl);

            console.log("restaurant.imageUrl >>", restaurant.imageUrl);

            const mappedData = {
                aboutUs: restaurant.aboutUs || "",
                address: restaurant.contacts
                    ? restaurant.contacts.address
                    : null,
                ageLimit: advertisement.ageLimit || null,
                branch: restaurant.branch || "",
                discount: advertisement.discount || null,
                dutyStatus: advertisement.dutyStatus || null,
                educationLevel: advertisement.educationLevel || null,
                explanation: advertisement.explanation || "",
                genders: advertisement.genders
                    ? advertisement.genders.join(", ")
                    : null,
                imageFileName: restaurant.imageFileName || "resPlaceHolder.png",
                instagram: restaurant.contacts
                    ? restaurant.contacts.instagram
                    : null,
                insurance: advertisement.insurance || null,
                jobTitle: restaurant.jobTitle || "",
                jobTypeId: restaurant.jobTypeId || null,
                languages: advertisement.languages
                    ? advertisement.languages.join(", ")
                    : null,
                marriageStatus: advertisement.marriageStatus || null,
                maxSalary: advertisement.maxSalary * 1000000 || null,
                meal: advertisement.meal || null,
                minSalary: advertisement.minSalary * 1000000 || null,
                nation: advertisement.nation || null,
                phoneNumber: restaurant.phoneNumber || null,
                residence: advertisement.residence || null,
                restInShift: advertisement.restInShif || null,
                salary: advertisement.salary || null,
                shuttleService: advertisement.shuttleService || null,
                skillLevels: advertisement.skillLevels
                    ? advertisement.skillLevels.join(", ")
                    : null,
                style: advertisement.style || null,
                telegram: restaurant.contacts
                    ? restaurant.contacts.telegram
                    : null,
                trainingClass: advertisement.trainingClass || null,
                workExperience: advertisement.workExperience || null,
            };

            console.log("mappedData >>", mappedData);

            form.setFieldsValue(mappedData);
        }
    }, [apiResponse]);

    const businessTypesArray = [
        "قهوه‌خانه",
        "قنادی",
        "رستوران",
        "کافه",
        "کافه رستوران",
        "چلوکبابی",
        "فست فود",
        "شرکتی",
    ];

    const skillLevelsArray = ["تازه کار", "ماهر", "متخصص", "کارآموز"];

    const dutyStatusArray = ["معافیت دائم", "معفیت موقت"];

    const gendersArray = ["مرد", "زن", "دیگر"];

    const nationArray = ["ایرانی", "غیر ایرانی"];

    const marriageStatusArray = ["مجرد", "متاهل"];

    const languagesArray = [
        "انگلیسی",
        "فرانسه",
        "عربی",
        "ترکی استانبولی",
        "سایر",
    ];

    const workBonesVarName = [
        "insurance",
        "trainingClass",
        "residence",
        "style",
        "meal",
        "shuttleService",
        "discount",
        "restInShif",
    ];

    const workBonesTitleName = [
        "پوشش بیمه",
        "کلاس آموزشی",
        "محل اقامت",
        "تیپ",
        "وعده‌ی غذایی",
        "سرویس رفت و آمد",
        "تخفیف پرسنلی",
        "استراحت در شیفت",
    ];

    const handleInputChange = (changedValues, allValues) => {
        console.log("Changed values:", changedValues);
        console.log("All values:", allValues);
    };

    const backBtnHandler = () => {
        setUserPlace("external-advert-list");
    };

    return (
        <>
            {apiResponse ? (
                <Row gutter={[24, 24]} className="content">
                    <Col span={24} className="external-advert-card">
                        <Form
                            form={form}
                            name="restaurant-base-info-form"
                            layout="vertical"
                            autoComplete="off"
                            onValuesChange={handleInputChange}
                            // initialValues={profileData}
                        >
                            <Card className="first-card">
                                <div className="card-header">
                                    <div
                                        className="back-arrow-btn"
                                        onClick={backBtnHandler}
                                    >
                                        <BackIcon />
                                    </div>

                                    <div className="restaurant-img-container">
                                        {profileImg ? (
                                            <ImageWithFallback
                                                imageUrl={profileImg}
                                                className={"restaurant-img"}
                                                alt={"restaurant-img"}
                                                needPrefix={false}
                                            />
                                        ) : (
                                            <div className="restaurant-img-placeholder"></div>
                                        )}
                                    </div>

                                    <div className="restaurant-title">
                                        <div className="restaurant-info-text">
                                            اطلاعات مجموعه
                                        </div>
                                        <div className="restaurant-name">
                                            چلوکباب رفتاری
                                        </div>
                                        <div className="restaurant-address">
                                            آدرس وبسایت: {"raftari.ir"}
                                        </div>
                                    </div>
                                </div>

                                {/* {apiResponse.restaurant.alreadyExist ? ( */}
                                {true ? ( // temp
                                    <>
                                        <div className="restaurant-base-info">
                                            <div className="section-title">
                                                اطلاعات پایه
                                            </div>

                                            <Row gutter={[48, 10]}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="عنوان مجموعه"
                                                        name="jobTitle"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={8}>
                                                    <Form.Item
                                                        label="شعبه"
                                                        name="branch"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={8}>
                                                    <Form.Item
                                                        label="شماره موبایل"
                                                        name="phoneNumber"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={16}>
                                                    <Form.Item
                                                        label="درباره ما"
                                                        name="aboutUs"
                                                    >
                                                        <TextArea
                                                            placeholder=""
                                                            autoSize={{
                                                                minRows: 5,
                                                                maxRows: 5,
                                                            }}
                                                            // onChange={handleChange}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={8}>
                                                    <Form.Item
                                                        label="تصویر پروفایل"
                                                        name="imageFileName"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={24}>
                                                    <Form.Item label="نوع کسب و کار">
                                                        {businessTypesArray.map(
                                                            (type) => (
                                                                <Button
                                                                    type="default"
                                                                    key={type}
                                                                    className="card-btn"
                                                                >
                                                                    {type}
                                                                </Button>
                                                            )
                                                        )}
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="restaurant-contact-section">
                                            <div className="section-title">
                                                راه‌های ارتباطی
                                            </div>

                                            <Row gutter={[48, 10]}>
                                                <Col span={8}>
                                                    <Form.Item
                                                        label="شماره موبایل (خط ارتباطی)"
                                                        name="phoneNumber"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={8}>
                                                    <Form.Item
                                                        label="اینستاگرام"
                                                        name="instagram"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={8}>
                                                    <Form.Item
                                                        label="تلگرام"
                                                        name="telegram"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>

                                                <Col span={24}>
                                                    <Form.Item
                                                        label="آدرس"
                                                        name="address"
                                                    >
                                                        <Input placeholder="" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                            </Card>

                            <Card title="شرایط شغلی" className="second-card">
                                <Row>
                                    <Col span={8}>
                                        <Form.Item
                                            label="عنوان شغلی"
                                            name="jobTypeId"
                                        >
                                            <Select
                                                placeholder=""
                                                // onChange={handleChange}
                                            >
                                                <Option value="option1">
                                                    Option 1
                                                </Option>
                                                <Option value="option2">
                                                    Option 2
                                                </Option>
                                                <Option value="option3">
                                                    Option 3
                                                </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={8}>
                                        <Form.Item
                                            label="سطح مهارت"
                                            name="skillLevels"
                                        >
                                            {skillLevelsArray.map((type) => (
                                                <Button
                                                    key={type}
                                                    type={"default"}
                                                    className="card-btn"
                                                    // onClick={() => handleClick(type)}
                                                >
                                                    {type}
                                                </Button>
                                            ))}
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            label="وضعیت نظام وظیفه"
                                            name="dutyStatus"
                                        >
                                            {dutyStatusArray.map((type) => (
                                                <Button
                                                    key={type}
                                                    type={"default"}
                                                    className="card-btn"
                                                    // onClick={() => handleClick(type)}
                                                >
                                                    {type}
                                                </Button>
                                            ))}
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item label="جنسیت" name="genders">
                                            {gendersArray.map((type) => (
                                                <Button
                                                    key={type}
                                                    type={"default"}
                                                    className="card-btn"
                                                    // onClick={() => handleClick(type)}
                                                >
                                                    {type}
                                                </Button>
                                            ))}
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item label="ملیت" name="nation">
                                            {nationArray.map((type) => (
                                                <Button
                                                    key={type}
                                                    type={"default"}
                                                    className="card-btn"
                                                    // onClick={() => handleClick(type)}
                                                >
                                                    {type}
                                                </Button>
                                            ))}
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            label="وضعیت تاهل"
                                            name="marriageStatus"
                                        >
                                            {marriageStatusArray.map((type) => (
                                                <Button
                                                    key={type}
                                                    type={"default"}
                                                    className="card-btn"
                                                    // onClick={() => handleClick(type)}
                                                >
                                                    {type}
                                                </Button>
                                            ))}
                                        </Form.Item>
                                    </Col>

                                    <Col span={8}>
                                        <Form.Item
                                            label="زبان خارجی"
                                            name="languages"
                                        >
                                            {languagesArray.map((type) => (
                                                <Button
                                                    key={type}
                                                    type={"default"}
                                                    className="card-btn"
                                                    // onClick={() => handleClick(type)}
                                                >
                                                    {type}
                                                </Button>
                                            ))}
                                        </Form.Item>
                                    </Col>

                                    <Row
                                        gutter={[48, 0]}
                                        style={{ width: "100%" }}
                                    >
                                        <Col span={8}>
                                            <Form.Item
                                                label="حداقل سابقه"
                                                name="workExperience"
                                            >
                                                <Select
                                                    placeholder=""
                                                    // onChange={handleChange}
                                                >
                                                    <Option value="option1">
                                                        Option 1
                                                    </Option>
                                                    <Option value="option2">
                                                        Option 2
                                                    </Option>
                                                    <Option value="option3">
                                                        Option 3
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                label="حداکثر سن"
                                                name="ageLimit"
                                            >
                                                <Select
                                                    placeholder=""
                                                    // onChange={handleChange}
                                                >
                                                    <Option value="option1">
                                                        Option 1
                                                    </Option>
                                                    <Option value="option2">
                                                        Option 2
                                                    </Option>
                                                    <Option value="option3">
                                                        Option 3
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>

                                        <Col span={8}>
                                            <Form.Item
                                                label="حداقل تحصیلات"
                                                name="educationLevel"
                                            >
                                                <Select
                                                    placeholder=""
                                                    // onChange={handleChange}
                                                >
                                                    <Option value="option1">
                                                        Option 1
                                                    </Option>
                                                    <Option value="option2">
                                                        Option 2
                                                    </Option>
                                                    <Option value="option3">
                                                        Option 3
                                                    </Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Row>
                            </Card>

                            <Card title="مزایای شغلی" className="third-card">
                                <Row gutter={[48, 0]}>
                                    {workBonesVarName.map((varName, index) => (
                                        <Col span={12} key={index}>
                                            <Form.Item name={varName}>
                                                <Flex justify="space-between">
                                                    <Text>
                                                        {
                                                            workBonesTitleName[
                                                                index
                                                            ]
                                                        }
                                                    </Text>
                                                    <Switch />
                                                </Flex>
                                            </Form.Item>
                                        </Col>
                                    ))}
                                </Row>
                            </Card>

                            <Card title="موراد تکمیلی" className="fourth-card">
                                <Row>
                                    <Col span={24}>
                                        <Form.Item
                                            label="شرح شغلی"
                                            name="explanation"
                                        >
                                            <TextArea
                                                placeholder=""
                                                autoSize={{
                                                    minRows: 5,
                                                    maxRows: 8,
                                                }}
                                                // onChange={handleChange}
                                                maxLength={1000}
                                                showCount
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Col span={24} className="salary-section">
                                        <Flex justify="space-between">
                                            <div className="right-side">
                                                <div className="top-text">
                                                    حقوق و دستمزد
                                                </div>
                                                <div className="bottom-text">
                                                    حقوق و دستمزد مورد نظرت رو
                                                    وارد کن
                                                </div>
                                            </div>

                                            <div className="left-side">
                                                <Form.Item name="salary">
                                                    <Flex justify="space-between">
                                                        <Switch />
                                                        <Text>حقوق توافقی</Text>
                                                    </Flex>
                                                </Form.Item>
                                            </div>
                                        </Flex>
                                    </Col>

                                    {/* {apiResponse.advertisement.salary ? ( */}
                                    {true ? ( // temp
                                        <Row
                                            gutter={[20]}
                                            className="show-salary-section"
                                        >
                                            <Col span={8}>
                                                <Form.Item
                                                    label="حداقل حقوق به تومان"
                                                    name="minSalary"
                                                >
                                                    <Input placeholder="" />
                                                </Form.Item>
                                            </Col>

                                            <Col span={8}>
                                                <Form.Item
                                                    label="حداکثر حقوق به تومان"
                                                    name="maxSalary"
                                                >
                                                    <Input placeholder="" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    ) : (
                                        ""
                                    )}
                                </Row>
                            </Card>
                        </Form>

                        <Flex justify="flex-end">
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="submit-btn"
                                >
                                    ثبت اطلاعات
                                </Button>
                            </Form.Item>
                        </Flex>
                    </Col>
                </Row>
            ) : (
                <Spin size="large" className="loading-token-spinner" />
            )}
        </>
    );
};

export default ExternalAdvertProfile;
