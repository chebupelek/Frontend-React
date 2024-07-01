import { Card, Col, Row, Button, Space } from "antd";
import { SearchOutlined, PlusOutlined, MinusOutlined, DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getInspectionsChildsThunkCreator } from "../../Reducers/InspectionListReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ConsultationGroupedCard(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    };
    

    const [childs, setChilds] = useState();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        props.hasChain ? handleLoadChild() : setChilds(props.childList);
    }, [props.hasChain, props.childList]);

    useEffect(() => {
    }, [isOpen]);

    const handleLoadChild = async () => {
        try {
            const result = await dispatch(getInspectionsChildsThunkCreator(props.consultationId));
            setChilds(result);
        } catch (error) {
            console.error("Failed to load child inspections:", error);
        }
    };

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <Card style={{ width: '100%', boxSizing: 'border-box', backgroundColor: '#f6f6fb', marginTop: '1%', border: props.isBordered ? "1px solid #dcdcdc" : "none", cursor: 'pointer'}}>
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
                        <Button type="link" style={{ color: "#317dba" }} onClick={() => navigate(`/inspection/${props.consultationId}`)}><strong><SearchOutlined /> Детали осмотра</strong></Button>
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
                    {props.num <= 3 ? <DownOutlined  /> : <></>}
                    <ConsultationGroupedCard
                            isBordered={true}
                            conclusion={childs[0].conclusion}
                            createTime={childs[0].createTime}
                            diagnosis={childs[0].diagnosis}
                            doctor={childs[0].doctor}
                            consultaionId={childs[0].id}
                            hasChain={childs[0].hasChain}
                            hasNested={childs[0].hasNested}
                            childList={childs.slice(1)}
                            patient={props.patient}
                            num={props.num + 1}
                        />
                </Row>
            ) : null}
        </Card>
    );
}

export default ConsultationGroupedCard;
