# 🎬 COCOTUBE - 유튜브 프로젝트

![ddd](./assets/cocotubeMain.png)

## 📝 프로젝트 정보

**[드림코딩 리액트 - 유튜브 프로젝트](https://github.com/chaehaeun/dreamcoding-youtube-clone)** 강의를 수강하며 만든 작업물을 디자인, 기능, 기술 스택을 추가하여 다시 작업한 개인프로젝트입니다.

### 프로젝트 개요

- **주제** : 유튜브 클론 프로젝트
- **작업 기간** : 2023.08.07 ~ 2023.10.08
- **분류** : 개인 프로젝트

### 주요 구현 기능

- firebase 로그인, 회원가입, 로그아웃, 회원탈퇴
- 구글, 깃허브 소셜 로그인
- 마이페이지 (좋아요 누른 영상 조회, 내 정보 수정)
- 영상 좋아요, 채널 구독
- 채널 페이지 조회
- 동영상 검색
- 음성 인식 검색
- 검색 필터링 기능
- 영상 댓글 조회
- 무한 스크롤
- 반응형웹

<br/>

## 🚀 배포 링크

🚨 **프로젝트에 사용된 Youtube Data Api v3 의 경우 하루 무료 사용량이 제한되어 있어 다양한 검색 요청이 들어가게 되면 사용량 초과로 인해 검색이 되지 않을 수 있습니다.**

사용량 초과로 인해 배포 페이지 서비스가 제한적인 경우 불편하시더라도 데모 영상을 확인해주시면 감사하겠습니다.

**[COCOTUBE 배포 주소로 이동](https://cocotube3210.web.app/)**

<br/>

## 🛠 사용 기술 및 도구

### Develop

<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/> <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"/> <img src="https://img.shields.io/badge/react hook form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white"/> <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>

### Deploy

<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>

<br/>

## 🎥 데모 영상

[![Video](http://img.youtube.com/vi/BYc_DP6nX8I/0.jpg)](https://youtu.be/BYc_DP6nX8I)

<br/>

## ✏️ 구현 내용

### Home

| Home                       |
| -------------------------- |
| ![Home](./assets/Home.gif) |

#### 무한 스크롤 커스텀 훅 구현

```tsx
type FetchData = ({
  pageParam,
}: {
  pageParam?: string | undefined
}) => Promise<{ video: YoutubeVideoType; nextPageToken: boolean }>

const useInfiniteScroll = (
  key: [string, string | undefined, SearchFilter | undefined],
  fetchData: FetchData,
  options = {},
) => {
  const { ref, inView } = useInView({
    threshold: 1,
  })

  const { isLoading, data, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery(key, fetchData, {
      ...options,
      getNextPageParam: lastPage => lastPage.nextPageToken || undefined,
      staleTime: STALE_TIME,
    })

  useEffect(() => {
    if (inView && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage, isLoading])

  return {
    ref,
    isLoading,
    data,
    fetchNextPage,
    error,
  }
}

export default useInfiniteScroll

//

const {
  ref,
  isLoading,
  data: videoData,
  error,
} = useInfiniteScroll(
  ['channelVideo', channelId, 'date'],
  ({ pageParam = undefined }) =>
    youtubeClient.listChannelVideos(channelId, pageParam, 'date'),
)
```

- 비디오데이터 쿼리 캐싱과 무한 스크롤 구현이 필요한 컴포넌트가 다수 있어 `React Query` 의 `useInfiniteQuery` 와 `react-intersection-observer` 를 엮어 커스텀 훅으로 추상화 하였습니다. (Home, Search, Channel 페이지에서 사용됨)

### SignIn / SignUp

| 회원가입                       |
| ------------------------------ |
| ![signUp](./assets/signup.gif) |

| 로그인                         |
| ------------------------------ |
| ![signIn](./assets/signIn.gif) |

#### Auth 기능 구현

- `Firebase Authentication` 을 사용하여 회원가입, 로그인, 로그아웃, 구글/깃허브 소셜 로그인, 회원탈퇴 기능을 구현하였습니다.
- `AuthInput` 공통 컴포넌트를 만들어 재사용하였습니다.
- 회원가입, 로그인 폼의 유효성 검사를 위해 `React Hook Form` 을 사용하였습니다.

### My Page

| 마이페이지                     |
| ------------------------------ |
| ![Mypage](./assets/MyPage.gif) |

#### 회원 정보 수정 기능

- 닉네임 변경시 `Firebase Authentication` 에서 제공하는 `updateProfile` 메서드를 사용하여 `DisplayName`을 변경하였습니다.
- 프로필 사진 변경시 `Firebase Storage` 에 이미지를 업로드 하고, `Firebase Authentication` 에서 제공하는 `updateProfile` 메서드를 사용하여 프로필 사진을 변경하였습니다.
- `Recoil` 로 로그인한 유저의 정보를 전역 상태로 관리하여 프로필 사진 변경시 우측 상단의 프로필 사진이 즉시 변경되도록 구현하였습니다.

### Search

| 검색                            |
| ------------------------------- |
| ![search](./assets/Search1.gif) |

#### 음성 인식 기능

- `react-speech-recognition` 라이브러리를 사용하여 음성 인식 검색 기능을 구현하였습니다.(검색어 입력창에 마이크 아이콘을 클릭하면 음성 인식이 시작됩니다.)

#### 검색 필터링 기능

```tsx
const [filter, setFilter] = useState<SearchFilter>('relevance')

//

const {
  ref,
  isLoading,
  data: videoData,
} = useInfiniteScroll(
  ['videos', searchKeyword, filter],
  ({ pageParam = undefined }) =>
    youtubeClient.searchByKeyword(searchKeyword, pageParam, filter),
)
```

- 검색 필터링 기능을 구현하기 위해 `useState` 를 사용하여 `filter` 상태를 관리하였습니다.
- `filter` 상태에 따라 api 함수의 파라미터를 변경하여 검색 결과를 필터링 하였습니다.
- `Search Keyword`와`filter`에 따라 필터링된 결과를 캐싱하여 버튼을 누를 때마다 api 요청을 보내지 않도록 하였습니다.

### Video Detail

| 비디오 디테일                            |
| ---------------------------------------- |
| ![videoDetail](./assets/VideoDetail.gif) |

#### 비디오 데이터

- 상위 컴포넌트에서 `React Router` 기능인 `state`로 비디오 데이터를 전달받아 사용하였습니다.
- 상위 컴포넌트에서 받아온 `video id`를 활용해 댓글 데이터를 불러왔습니다. api 사용 가능 횟수가 많지 않아 댓글 데이터는 최신순으로 25개만 불러오도록 구현했습니다.

#### 구독 / 좋아요 기능

- `React Query` 를 활용하여 구독 버튼을 누르면 `firestore`의 사용자 정보를 업데이트하고, 좌측의 구독 채널 목록이 즉시 업데이트 되도록 구현했습니다.
- 좋아요 기능 또한 `React Query` 를 활용하여 구현했습니다. 좋아요 누른 영상은 마이페이지에서 즉시 업데이트 되도록 했습니다.

### Channel

| 채널                             |
| -------------------------------- |
| ![channel](./assets/Channel.gif) |

- 해당 채널이 업로드한 비디오를 최신순으로 조회할 수 있습니다.

### 반응형 웹

| 반응형                                 |
| -------------------------------------- |
| ![responsive](./assets/responsive.gif) |

```Scss
@mixin respond-to($size) {
  @if $size == max-640 {
    @media screen and (max-width: 640px) {
      @content;
    }
  } @else if $size == max-768 {
    @media screen and (max-width: 768px) {
      @content;
    }
  } @else if $size == max-1024 {
    @media screen and (max-width: 1024px) {
      @content;
    }
  } @else if $size == max-1280 {
    @media screen and (max-width: 1280px) {
      @content;
    }
  } @else if $size == max-1400 {
    @media screen and (max-width: 1400px) {
      @content;
    }
  } @else if $size == min-769 {
    @media screen and (min-width: 769px) {
      @content;
    }
  }
}
```

```Scss
// 사용 예시
.info {
  @include alienCenter(20px);
  @include respond-to(max-768) {
    flex-direction: column;
    text-align: center;
  }
}
```

- `Sass`의 `Mixin`을 활용하여 브레이크 포인트 별로 반응형 웹을 구현하였습니다.
