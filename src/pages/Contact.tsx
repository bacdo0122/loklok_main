import * as React from 'react';
import { HeaderWrap } from '../components/common/HeaderWrap';
import '../css/contact.css'
const Contact = () => {
  return <>
  <HeaderWrap>
    <div className="contact-body">
      <img src="https://img.netpop.app/fe/0e3ecf40-8312-4d09-a155-15f7904a8ab4/contact-cover.png" alt="contact-image" />
      <h1>Contact us</h1>
      <article>
        <p>Email : bacdo0122@gmail.com</p>
        <p>Twitter: <a href="https://twitter.com/Bc37831613">https://twitter.com/Bc37831613</a></p>
        <p>Youtube : <a href="https://www.youtube.com/channel/UCx2zqiMOUpwW5PwxJNSxUHw">https://www.youtube.com/channel/UCx2zqiMOUpwW5PwxJNSxUHw</a></p>
      </article>
    </div>
  </HeaderWrap>
  </>;
};

export default Contact;
