import { useContext } from "react"
import styled from "styled-components"
import { CurrentThemeProps, ThemeContext } from "../../App"
import { lightTheme } from "../../theme"

const CContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1.5rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
    width: 100%;
    height: 100%;
    max-width: 80em;
    column-gap: 1rem;
    row-gap: 3rem;
    justify-content: start;

    @media screen and (min-width: 30em) {
        padding-left: 2rem;
        padding-right: 2rem;
    }

    @media screen and (min-width: 48em) {
        margin-top: 3rem;
        padding-bottom: 4rem;
    }

    @media screen and (min-width: 62em) {
        padding-left: 4rem;
        padding-right: 4rem;
        margin-top: 3rem;
        padding-bottom: 5rem;
        column-gap: 3rem;
    }

    @media screena and (min-width: 80em) {
        padding-left: 5rem;
        padding-right: 5rem;
        row-gap: 1rem;
        column-gap: 4rem;
    }
`

const CHeader = styled.h1`
    font-size: 3rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 700;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 1rem;

    @media screen and (min-width: 48em) {
        font-size: 3.5rem;
    }

    @media screen and (min-width: 62em) {
        font-size: 4rem;
    }
`

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    max-height: 30rem;
    align-items: center;
    padding-bottom: 2rem;

    @media screen and (min-width: 48em) {
        font-size: 3rem;
    }

    @media screen and (min-width: 80em) {
        font-size: 3.5rem;
    }
`

const ProfileWrapper = styled.div`
    display: inline-block;
    position: relative;
    width: 10rem;
    height: 10rem;
    overflow: hidden;
    border-radius: 50%;
    box-shadow: 2px 5px 10px #181818;
`

const ProfileImage = styled.img`
    width: 100%;
    height: auto;
`

const ProfileContents = styled.div`
    display: flex;
    flex-direction: column;
`

const ProfileName = styled.h2`
    font-size: 2rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 700;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 0.5rem;
    padding-left: 5rem;

    @media screen and (min-width: 48em) {
        font-size: 2.2rem;
    }

    @media screen and (min-width: 62em) {
        font-size: 2.5rem;
    }
`

const ProfileInfo = styled.h5`
    font-size: 0.8rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 500;
    font-family: 'Steradian', system-ui, sans-serif;
    letter-spacing: -0.025rem;
    margin-bottom: 1rem;
    padding-left: 5rem;

    @media screen and (min-width: 48em) {
        font-size: 1rem;
    }

    @media screen and (min-width: 62em) {
        font-size: 1.2rem;
    }
`

const ProfileDetails = styled.p<CurrentThemeProps>`
    font-size: 0.6rem;
    line-height: calc(1em + 0.25rem);
    font-weight: 500;
    font-family: 'OTWelcomeRA', system-ui, sans-serif;
    letter-spacing: 0.1rem;
    margin-top: 1rem;
    padding-left: 5rem;
    color: ${({ currentTheme }) => currentTheme === lightTheme ? '#7A8287' : '#C8C8C8'};

    @media screen and (min-width: 48em) {
        font-size: 0.8rem;
    }

    @media screen and (min-width: 62em) {
        font-size: 1rem;
    }
`

export default function Contribute() {
    const { theme } = useContext(ThemeContext);

    return (
        <CContainer>
            <CHeader>
                Contribute
            </CHeader>
            <ProfileContainer>
                <ProfileWrapper onContextMenu={(e) => e.preventDefault()}>
                    <ProfileImage style={{ marginBottom: "1rem" }} src="./.profile/jaemu.jpg" />
                </ProfileWrapper>
                <ProfileContents>
                    <ProfileName>
                        Jaemu Heo (Leader)
                    </ProfileName>
                    <ProfileInfo>
                        Computer Science, Handong Univ.
                    </ProfileInfo>
                    <ProfileDetails currentTheme={theme} >
                        딥러닝, 수리통계, 모델링
                        <br />
                        뭔가 보여드리겠습니다😎
                    </ProfileDetails>
                </ProfileContents>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrapper onContextMenu={(e) => e.preventDefault()}>
                    <ProfileImage style={{ marginTop: "-2rem" }} src="./.profile/jaehyeon.jpg" />
                </ProfileWrapper>
                <ProfileContents>
                    <ProfileName>
                        Jaehyeon Woo
                    </ProfileName>
                    <ProfileInfo>
                        Economics, Handong Univ.
                    </ProfileInfo>
                    <ProfileDetails currentTheme={theme} >
                        경제학, 수리통계학도
                        <br />
                        경제하는 오이🥒
                    </ProfileDetails>
                </ProfileContents>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrapper onContextMenu={(e) => e.preventDefault()}>
                    <ProfileImage style={{ marginTop: "-2rem" }} src="./.profile/hosu.jpg" />
                </ProfileWrapper>
                <ProfileContents>
                    <ProfileName>
                        Hosu Kim
                    </ProfileName>
                    <ProfileInfo>
                        Economics, Handong Univ.
                    </ProfileInfo>
                    <ProfileDetails currentTheme={theme} >
                        딥러닝, 수리통계, 모델링
                        <br />
                        수학하는 감자🥔
                    </ProfileDetails>
                </ProfileContents>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrapper onContextMenu={(e) => e.preventDefault()}>
                    <ProfileImage style={{ marginBottom: "1rem" }} src="./.profile/daeyoung.jpg" />
                </ProfileWrapper>
                <ProfileContents>
                    <ProfileName>
                        Daeyeong Yun
                    </ProfileName>
                    <ProfileInfo>
                        ACE, Handong Univ.
                    </ProfileInfo>
                    <ProfileDetails currentTheme={theme} >
                        수학통계, 데이터분석, 데이터 시각화
                        <br />
                        히히 신난다😊
                    </ProfileDetails>
                </ProfileContents>
            </ProfileContainer>
            <ProfileContainer>
                <ProfileWrapper onContextMenu={(e) => e.preventDefault()}>
                    <ProfileImage style={{ marginTop: "-2rem" }} src="./.profile/minu.jpg" />
                </ProfileWrapper>
                <ProfileContents>
                    <ProfileName>
                        Minwoo Kim (Web)
                    </ProfileName>
                    <ProfileInfo>
                        Computer Science, Handong Univ.
                    </ProfileInfo>
                    <ProfileDetails currentTheme={theme} >
                        주니어 프론트엔드 개발자,
                        <a style={{ color: "inherit" }} href="https://github.com/newForinux"> (Github) </a>
                        <br />
                        프론트엔드에 진심인 편🚀
                    </ProfileDetails>
                </ProfileContents>
            </ProfileContainer>
        </CContainer>
    )
}