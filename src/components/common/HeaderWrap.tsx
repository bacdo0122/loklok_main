import { Box, BoxProps, styled } from "@mui/material";
import ComponentWrap from "./index"
import React from 'react'
const Body = styled(Box)<BoxProps>({
    minHeight: 'calc((100vh - 78px) - 150px)',
    maxWidth: '1240px',
    minWidth: '768px',
    position: 'relative',
    margin: '0 auto',
    fontSize: '18px',
    color: '#999',
    fontWeight: 'bold',
    lineHeight: '120%',
    paddingTop: "20px",
    paddingBottom: "20px"
  });
export const HeaderWrap = ({children}:any) => {
    return (
        <ComponentWrap headerData="header-v-detail">
            <Body>
                {children}
            </Body>
        </ComponentWrap>
    )
} 