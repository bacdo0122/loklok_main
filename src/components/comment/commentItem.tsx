import React, { useEffect, useRef, useState } from 'react';
import { fetcher } from '../../helper/fetch';
import { getAccessToken } from '../../helpers/localStorage';
import { commentProp, film, replies, users } from '../../interface';
import CommentWrap from './commentWrap';
import '../../css/comment.css'
import moment from 'moment'
import { isNumber } from 'lodash';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useAppSelector } from '../../stores/hook';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
interface Props {
    comment: commentProp,
    handleSubmit: (type: string, table: string, content: string, parent_id: number) => void,
    handleLikeComment: (commentId: number, is_reply: boolean) => void,
    isReply?: boolean
}



const CommentItem = (props: Props) => {
    const { comment, handleSubmit, isReply, handleLikeComment } = props;
    const [getReplies, setGetReplies] = useState(false);
      const user = useAppSelector((state: any) => state.auth.user)
    const [liked, setLiked] = useState(false);
    const [replies, setReplies] = useState([])
    const [popInput, setPopInput] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const [date, setDate] = useState(moment.utc(comment.updatedAt).local().startOf('seconds').fromNow())
    useEffect(() => {
        const getReplies = async () => {
            if (!comment.replies) {
                const data = await fetcher(`/replies/${comment.id}`, getAccessToken() as string)
                setReplies(data.data)
            }
        }
        getReplies()
    }, [comment])
    useEffect(()=>{
        if(user && comment.likes.length > 0 ){     
            const checkLiked = comment.likes.filter((like:any)=>like.userId === user.id)
            if(checkLiked.length > 0) setLiked(true)
            else setLiked(false)
        }
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(moment.utc(comment.updatedAt).local().startOf('seconds').fromNow())
        }, 1000)
        return () => clearInterval(interval);
    }, [])



    return <li className={isReply ? `comment reply` : `comment`}>
        <div className="comment-wrap">
            <div className="comment-img-content">
                <div className="comment-img">
                    <a href="/">
                        <img src={comment.user && comment.user.avatar} alt={comment.user && comment.user.name} />
                    </a>
                    {isReply && <div className="reply-user-line"></div>}
                </div>
                <div className="comment-content">
                    <div className="content-info-wrap">
                        <div className="content-name">{comment.user && comment.user.name}</div>
                        <div className="content-wrap">
                            <span className="content-text">{comment.content}</span>
                        </div>
                    </div>
                    <div className="content-like-reply-wrap">
                        <ul className="content-list">
                            <li className="content-item" onClick={() => 
                                {handleLikeComment(comment.id, isNumber(comment.parent_comment_id || comment.parent_reply_id))
                                setLiked(!liked)}
                                }>
                               
                               {liked ? <ThumbUpIcon titleAccess='unlike'/> : <ThumbUpOffAltIcon titleAccess='like'/>}
    

                            </li>
                            <div className="content-item"> <span>{comment.likes && comment.likes.length}</span></div>
                            <li className="content-item" onClick={() => {
                                if (!popInput) {

                                    document.querySelectorAll(".input_active").forEach((input) => {

                                        input.classList.remove("input_active");
                                    })

                                }

                                setPopInput(!popInput)

                            }}>
                                <span>Reply</span>
                            </li>
                            <li className="content-item content-time">
                                <span>{date}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div className="replies-wrap">
            <ul className="replies-list">
                {(comment.replies) && comment.replies.map((comment: commentProp) => {
                    return <CommentWrap comment={comment} key={comment.id} handleLikeComment={handleLikeComment} handleSubmit={handleSubmit} />
                })}
                { getReplies &&  (replies.length > 0) && replies.map((comment: commentProp) => {
                        return <CommentWrap comment={comment} key={comment.id} handleLikeComment={handleLikeComment} handleSubmit={handleSubmit} />
                    }) 
                }
                {replies.length > 0 && <div className="getReply" onClick={()=> setGetReplies(!getReplies)}>
                        {getReplies ? <span>
                          <ArrowRightAltIcon />  Hide 
                        </span> : <span>
                          <ArrowRightAltIcon />  Show more
                        </span>}
                    </div>}
            </ul>
            <div className={popInput ? `messageInput input_active ` : `messageInput `}>
                <div className="message">
                <input type="text" id="message" ref={inputRef} />
                {popInput && <div className="reply-user-line"></div>}
                <button onClick={() => {
                    console.log(comment)
                    handleSubmit(
                        (!comment.parent_comment_id && !comment.parent_reply_id) ? "comment" : "reply",
                        "reply",
                        inputRef?.current?.value as string,
                        comment.id
                    )

                }}>Send</button>
                </div>
            </div>
            {((comment.replies && comment.replies.length > 0) || replies.length > 0 || popInput) &&
                <div className="link-user-line">

                </div>
            }
        </div>
    </li>;
}

export default CommentItem;