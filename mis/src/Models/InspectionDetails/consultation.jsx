import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Space, Typography } from "antd";
import Comment from './comment';
import { getInspectionCommentsThunkCreator } from '../../Reducers/InspectionDetailsReducer';
import { inspectionsApi } from '../../Api/inspectionApi';

function Consultation(props) {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const [consultationData, setConsultation] = useState(props.consultationData);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        get();
    }, [props.consultationData]);

    const get = async () => {
        const data = await inspectionsApi.getInspectionComments(props.consultationData.id);
        setComments(data.comments);
    }

    return (
        props.consultationData && (
            <Card key={props.consultationData.id} style={{ backgroundColor: '#f6f6fb' }}>
                <Space direction="vertical" size='middle' style={{ width: '100%' }}>
                    <Typography.Title style={{ margin: 0 }} level={3}>
                        Консультация
                    </Typography.Title>
                    <Typography.Text strong>
                        Консультант: {props.consultationData.rootComment.author.name}
                    </Typography.Text>
                    <Typography.Text type='secondary' strong>
                        Специализация консультанта: {props.consultationData.speciality.name}
                    </Typography.Text>
                    <Typography.Title style={{ margin: 0 }} level={4}>
                        Комментарии
                    </Typography.Title>
                    <Space direction='vertical' size='small' style={{ width: '100%' }}>
                        {comments !== undefined && 
                        <Comment
                            id = {props.consultationData.rootComment.id}
                            createTime = {props.consultationData.rootComment.createTime}
                            modifiedDate = {props.consultationData.rootComment.modifyTime}
                            content = {props.consultationData.rootComment.content}
                            authorId = {props.consultationData.rootComment.author.id}
                            author = {props.consultationData.rootComment.author.name}
                            consultationId={props.consultationData.id}
                            speciality={props.consultationData.speciality.name}
                            profile={profile}
                            comments={comments}
                        />}
                    </Space>
                </Space>
            </Card>
        )
    );
}

export default Consultation;
