import React, { useEffect, useState } from 'react';
import { Button, Card, Space, Typography, Row, Col, Tooltip, Input } from "antd";
import { editCommentThunkCreator, postCommentThunkCreator } from '../../Reducers/InspectionDetailsReducer';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import moment from 'moment';

function Comment(props) {
    const dispatch = useDispatch();

    const [id, setId] = useState(props.id);
    const [createTime, setCreateTime] = useState(props.createTime);
    const [modifiedDate, setModifiedDate] = useState(props.modifiedDate);
    const [content, setContent] = useState(props.content);
    const [authorId, setAuthorId] = useState(props.authorId);
    const [author, setAuthor] = useState(props.author);   
    const [consultationId, setConsultationId] = useState(props.consultationId);
    const [speciality, setSpeciality] = useState(props.speciality);
    const [profile, setProfile] = useState(props.profile);
    const [comments, setComments] = useState(props.comments);

    const [isOpen, setIsOpen] = useState(false);
    const [isRedact, setIsRedact] = useState(false);
    const [isAnswering, setIsAnswering] = useState(false);

    const [newReplyContent, setNewReplyContent] = useState('');

    const formatDateString = (dateString) => {
        return dayjs(dateString).format('DD.MM.YYYY - HH:mm');
    };

    useEffect(() => {
        setModifiedDate(props.modifiedDate);
    }, [props.modifiedDate]);

    useEffect(() => {
        setComments(props.comments);
    }, [props.comments]);

    const handleEdit = () => {
        setIsRedact(true);
    };

    const handleSave = async () => {
        if (content.length < 1 || content.length > 1000) {
            alert('Комментарий должен быть длиной от 1 до 1000 символов.');
            return;
        }
        const result = await dispatch(editCommentThunkCreator(id, {content: content}));
        console.log(result);
        if (result === true) {
            setIsRedact(false);
        }
    };

    const handleReply = async () => {
        if (newReplyContent.length < 1 || newReplyContent.length > 1000) {
            alert('Ответ должен быть длиной от 1 до 1000 символов.');
            return;
        }
        const result = await dispatch(postCommentThunkCreator(consultationId, {content: newReplyContent, parentId: id}));
        if (result) {
            console.log("result", result);
            let newList = comments;
            newList.push({
                id: result,
                createTime: new Date(),
                modifiedDate: new Date(),
                content: newReplyContent,
                authorId: authorId,
                author: author,
                parentId: id
              })
            setComments(newList);
            setNewReplyContent('');
            setIsAnswering(false);
        }
    };

    const handleShowReplies = () => {
        setIsOpen(!isOpen);
    };

    const normalizeDate = (dateString) => {
        const date = new Date(dateString);
        date.setMilliseconds(0);
        return date.toISOString();
    };

    const isDifferentDate = (date1, date2) => {
        return normalizeDate(date1) !== normalizeDate(date2);
    };

    return (
        <Card style={{ backgroundColor: '#f6f6fb'}} bordered={false}>
            <Space direction='vertical' size='small' style={{ width: '100%' }}>
                <Space direction='horizontal' size={'small'} style={{ width: '100%' }}>
                    <Typography.Text strong>
                        {author}
                    </Typography.Text>
                    <Typography.Text type='secondary' strong>
                        ({speciality})
                    </Typography.Text>
                    {(modifiedDate !== "" && isDifferentDate(modifiedDate, createTime)) &&
                        <Tooltip title={formatDateString(modifiedDate)}>
                            <Typography.Text type='secondary' strong> (редакт.) </Typography.Text>
                        </Tooltip>
                    }
                </Space>
                {isRedact ? 
                    <Row gutter={8} style={{ width: '100%' }}>
                        <Col flex="auto">
                            <Input.TextArea autoSize style={{ width: '100%' }} value={content} onChange={(e) => setContent(e.target.value)} status={content.length < 1 ? "error" : ""} />
                        </Col>
                        <Col flex="none">
                            <Button type="primary" style={{ backgroundColor: '#ff9900' }} onClick={handleSave}>Сохранить изменения</Button>
                        </Col>
                    </Row>
                 : 
                    <Typography.Paragraph>{content}</Typography.Paragraph>
                }
                <Space direction='horizontal' size={'small'} style={{ width: '100%' }}>
                    <Typography.Text type='secondary' strong>
                        {formatDateString(createTime)}
                    </Typography.Text>
                    {comments && comments.filter(c => c.parentId === id).length > 0 && (
                        <Button type="link" onClick={handleShowReplies}>{isOpen ? `Скрыть ответы` : `Показать ответы(${comments.filter(c => c.parentId === id).length})`}</Button>
                    )}
                    <Button type="link" onClick={() => setIsAnswering(!isAnswering)}>Ответить</Button>
                    {authorId === profile.id && (
                        <Button type="link" onClick={handleEdit}>Редактировать комментарий</Button>
                    )}
                </Space>
                {isAnswering && (
                    <Row gutter={8} style={{ width: '100%' }}>
                        <Col flex="auto">
                            <Input.TextArea autoSize style={{ width: '100%' }} value={newReplyContent} onChange={(e) => setNewReplyContent(e.target.value)} status={newReplyContent.length < 1 ? "error" : ""} />
                        </Col>
                        <Col flex="none">
                            <Button type="primary" style={{ backgroundColor: '#317dba' }} onClick={handleReply}>Оставить комментарий</Button>
                        </Col>
                    </Row>
                )}
                {isOpen && comments && comments.filter(c => c.parentId === id).map((answer, index) => (
                    <Comment
                        key ={index}
                        id = {answer.id}
                        createTime = {answer.createTime}
                        modifiedDate = {answer.modifiedDate}
                        content = {answer.content}
                        authorId = {answer.authorId}
                        author = {answer.author}
                        consultationId={consultationId}
                        speciality={speciality}
                        profile={profile}
                        comments={props.comments}
                    />
                ))}
            </Space>
        </Card>
    );
}

export default Comment;
