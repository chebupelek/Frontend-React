import { Card, Col, Row, Button, Space } from "antd";
import { FormOutlined, SearchOutlined, PlusOutlined, MinusOutlined, RightOutlined  } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getInspectionsChildsThunkCreator } from "../../Reducers/InspectionListReducer";
import { useDispatch } from "react-redux";

const translateConclusion = (conclusion) => {
    switch (conclusion) {
        case "Death":
            return "Смерть";
        case "Disease":
            return "Болезнь";
        case "Recovery":
            return "Выздоравливание";
        default:
            return conclusion;
    }
};

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}

function InspectionGroupedCard(props) {
    const dispatch = useDispatch();

    const [childs, setChilds] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        props.hasChain ? handleLoadChild() : setChilds(props.childList);
    }, []);

    useEffect(() => {
        
    }, [isOpen]);

    const handleLoadChild = async () => {
        try {
            const result = await dispatch(getInspectionsChildsThunkCreator(props.inspectionId));
            setChilds(result);
        } catch (error) {
            console.error("Failed to load child inspections:", error);
        }
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: props.conclusion !== 'Death' ? '#f6f6fb' : '#ffefe8', marginTop: '1%', border: props.isBordered ? "1px solid #dcdcdc" : "none"}}>
            <Row justify="space-between" align="middle">
                <Col>
                    <Space direction="horizontal" size="small">
                        {props.hasNested ? <Button type="primary" style={{ backgroundColor: "#317dba" }} onClick={handleClick}>{isOpen ? <MinusOutlined  /> : <PlusOutlined  />}</Button> : <></>}
                        <span style={{ backgroundColor: '#7b7f9b', color: "white" }}>{formatDate(props.createTime)}</span>
                        <span><strong>Амбулаторный осмотр</strong></span>
                    </Space>
                </Col>
                <Col>
                    <Space direction="horizontal" size="small">
                        {props.conclusion !== 'Death' && (<Button type="link" style={{ color: "#317dba" }}><strong><FormOutlined/> Добавить осмотр</strong></Button>)}
                        <Button type="link" style={{ color: "#317dba" }}><strong><SearchOutlined /> Детали осмотра</strong></Button>
                    </Space>
                </Col>
            </Row>
            <div>
                <span><strong>Заключение - {translateConclusion(props.conclusion)}</strong></span>
            </div>
            <div>
                <span><strong>Основной диагноз - {props.diagnosis.name}</strong></span>
            </div>
            <div>
                <span>Медицинский работник - {props.doctor}</span>
            </div>
            {childs && childs[0] && isOpen ? (
                <Row>
                    <Col>
                        {props.num <= 3 ? <RightOutlined /> : <></>}
                    </Col>
                    <Col>
                        <InspectionGroupedCard
                            isBordered={true}
                            conclusion={childs[0].conclusion}
                            createTime={childs[0].createTime}
                            diagnosis={childs[0].diagnosis}
                            doctor={childs[0].doctor}
                            inspectionId={childs[0].id}
                            hasChain={childs[0].hasChain}
                            hasNested={childs[0].hasNested}
                            childList={childs.slice(1)}
                            num={props.num + 1}
                        />
                    </Col>
                </Row>
            ) : null}
        </Card>
    );
}

export default InspectionGroupedCard;