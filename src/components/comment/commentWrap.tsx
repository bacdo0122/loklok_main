import React, { useEffect, useState } from 'react';
import { fetcher } from '../../helper/fetch';
import { getAccessToken } from '../../helpers/localStorage';
import {  commentProp, film, replies, users } from '../../interface';
import CommentItem from './commentItem';

interface Props{
    comment:commentProp,
    handleSubmit: (type:string, table:string, content:string, parent_id: number)=>void,
    handleLikeComment: (commentId:number, is_reply: boolean)=>void
   
}


const CommentWrap = (props:Props)=>{
    
    const {comment, handleSubmit,handleLikeComment} = props;

    return <>
    <CommentItem comment={comment} handleSubmit={handleSubmit} handleLikeComment={handleLikeComment} isReply={true}/>
    </>;
}

export default CommentWrap;