import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { fetcher, fetcherWithPost } from '../../helper/fetch';
import { getAccessToken } from '../../helpers/localStorage';
import { useAppSelector } from '../../stores/hook';
import CommentItem from './commentItem';

export default function Comments({ filmId }: any) {
  const [socket, setSocket] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const user = useAppSelector((state: any) => state.auth.user);
  const [change, setChange] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmitNewMessage = (type: string, table: string, content: string, parent_id: number) => {
    if (!user) {
      alert('please login before commenting!');
      navigate('/login');
    }

    if (socket) {
      socket.emit('message', {
        data: {
          type,
          table,
          content,
          parent_id,
        },
        room: filmId,
        userId: user.id,
      });
    }
  };
  useEffect(() => {
    setSocket(io(`localhost:3000`));
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on('connect', (data: any) => {
        socket.emit('joinRoom', filmId);
      });
      socket.on('disconnect', () => {
        socket.emit('leaveRoom', filmId);
      });
      socket.on('message', (data: any) => {
        setComments(data.data);
      });
      socket.on('like', (data: any) => {
        setComments(data.data);
      });
    }
    return () => {
      if (socket) {
        socket.off('connect');
        socket.off('disconnect');
      }
    };
  }, [socket]);

  useEffect(() => {
    console.log('changed');
    const getComment = async () => {
      const data = await fetcher(`/comments/${filmId}?page=1&limit=100`, getAccessToken() as string);
      setComments(data.data);
    };
    getComment();
  }, [change]);

  const handleLikeComment = (commentId: number, is_reply: boolean) => {
    if (!user) {
      alert('please login before commenting!');
      navigate('/login');
    }

    socket.emit('like', { data: { userId: user.id, filmId, commentId, is_reply }, room: filmId, userId: user.id });
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <div>
        <input type="text" id="message" ref={inputRef} />
        <button onClick={() => handleSubmitNewMessage('comment', 'comment', inputRef?.current?.value as string, 0)}>
          Submit
        </button>
      </div>
      <ul id="messages">
        {comments.length > 0 &&
          comments.map((comment: any) => {
            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                handleLikeComment={handleLikeComment}
                handleSubmit={handleSubmitNewMessage}
              />
            );
          })}
      </ul>
    </div>
  );
}
