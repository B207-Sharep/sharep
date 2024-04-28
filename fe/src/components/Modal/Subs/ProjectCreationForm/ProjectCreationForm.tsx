import BaseLabelWithInput from '@/components/InputWithLabel/InputWithLabel';
import React, { useState } from 'react';
import { CustomInput } from './ProjectCreationFormStyle';

export default function ProjectCreationForm() {
  const [formData, setFormData] = useState({
    title: '',
    bio: '',
    secretKey: '',
    // 팀원
  });

  return (
    <div
      className="Content"
      // style={{
      //   width: 640,
      //   height: 661,
      //   paddingLeft: 24,
      //   paddingRight: 24,
      //   flexDirection: 'column',
      //   justifyContent: 'flex-start',
      //   alignItems: 'flex-start',
      //   gap: 20,
      //   display: 'inline-flex',
      // }}
    >
      <div
        className="Form"
        // style={{
        //   alignSelf: 'stretch',
        //   height: 661,
        //   flexDirection: 'column',
        //   justifyContent: 'flex-start',
        //   alignItems: 'flex-start',
        //   gap: 16,
        //   display: 'flex',
        // }}
      >
        <div
          className="InputField"
          // style={{
          //   alignSelf: 'stretch',
          //   height: 70,
          //   flexDirection: 'column',
          //   justifyContent: 'flex-start',
          //   alignItems: 'flex-start',
          //   gap: 6,
          //   display: 'flex',
          // }}
        >
          <CustomInput>
            <BaseLabelWithInput
              id="title"
              type="text"
              value={formData.title}
              onChange={event => setFormData({ ...formData, title: event.target.value })}
            >
              프로젝트 이름
            </BaseLabelWithInput>
          </CustomInput>
        </div>
      </div>
    </div>
  );
}
