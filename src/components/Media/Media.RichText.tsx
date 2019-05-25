import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import styled, { css } from 'styled-components'

import mediaqueries, { media } from '@styles/media'

import { IRichText } from '@typings'

// Specifically handling Twitter embeds that get passed from our htmls htmlRenderer
const transform = node => {
  if (node.name === 'twitter' && node.attribs.twitterid) {
    return (
      <TwitterTweetEmbed
        key={node.attribs.twitterid}
        tweetId={node.attribs.twitterid}
      />
    )
  }
}

const RichText: React.SFC<IRichText> = ({
  content,
  contentRef,
  children,
  ...props
}) => {
  const html = ReactHtmlParser(content, { transform })

  return (
    <Content ref={contentRef} {...props}>
      {html}
      {children}
    </Content>
  )
}

export default RichText

const imageWidths = {
  regular: '680px',
  large: '1004px',
  full: '100vw',
}

const articleWidth = css`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;

  ${mediaqueries.tablet`
    padding: 0 20px;
  `};
`
const selectionColor = css`
  &::selection {
    background: #c9e1f4; /* WebKit/Blink Browsers */
  }

  &::-moz-selection {
    background: #c9e1f4; /* Gecko Browsers */
  }
`

const transitionColor = css`
  transition: color 0.25s ease;
`

const callToAction = css`
  .call-to-action {
    width: 100%;
    max-width: 1140px;
    margin: 30px auto 65px;
    padding: 65px;
    background: ${p => p.theme.mode.cta.background};
    transition: background 0.25s;

    p {
      position: relative;
      padding-bottom: 35px;
      color: ${p => p.theme.colors.moon};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 125px;
        height: 1px;
        background: ${p => p.theme.mode.cta.border};
      }
    }

    a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;

      &:first-child {
        margin-right: 55px;
      }

      svg {
        margin-right: 13px;

        path {
          fill: ${p => p.theme.mode.links};
        }
      }
    }

    &__content {
      width: 100%;
      max-width: 680px;
      margin: 0 auto;
    }

    ${mediaqueries.tablet`
      background: ${p => p.theme.mode.preview.bg}
      box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      margin: 20px 20px 55px;
      padding: 0;
      width: auto;

      h3 {
        padding: 50px 24px 0;
        margin-bottom: 15px;
        text-align: center;
      }

      p {
        margin-bottom: 50px;
        padding: 0 24px;
        text-align: center;
        font-size: 18px;

        &::after {
          content: none;
        }
      }

      &__links {
        display: flex;
        flex-direction: row-reverse;
        border-top: 1px solid  ${p => p.theme.mode.cta.border};
      }

      a {
        display: flex;
        flex: 1;
        height: 58px;
        font-size: 18px;
        text-decoration: none;

        svg {
          display: none;
        }

        &:first-child {
          margin-right: 0;
        }

        &:nth-child(2) {
          font-weight: 400;
          color: ${p => p.theme.colors.moon};
          border-right: 1px solid  ${p => p.theme.mode.cta.border};
        }
      }
    `}
  }
`

const highlight = css`
  highlight {
    display: inline;
    cursor: pointer;
    text-decoration: none;
    background: rgba(233, 218, 172, 0.3);
    transition: background 0.25s;

    &:hover {
      background: rgba(233, 218, 172, 0.4);
    }

    & > p {
      display: inline-block;
      margin-bottom: 0;
    }
  }
`

const Content = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  ${selectionColor}

  /* Custom Components form Contentful */
  ${callToAction}
  ${highlight}

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    ${articleWidth};
    font-family: ${p => p.theme.fontfamily.serif};
    * {
      font-family: ${p => p.theme.fontfamily.serif};
    }
    color: ${p => p.theme.mode.text};
  }

  h1,
  h1 * {
    font-weight: 700;
    font-size: 2.8rem;
    line-height: 1.1;

    ${mediaqueries.desktop_up`
      font-size: 4.2rem;
      margin-bottom: 2.5rem;
    `};
  }

  h2,
  h2 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 2rem;
    padding-top: 105px;

    ${mediaqueries.desktop_up`
      font-size: 3.2rem;
      paddng-top: 65px;
      margin-bottom: 2.5rem;
    `};
  }

  h3,
  h3 * {
    font-size: 2.2rem;
    line-height: 1.45;
    margin-bottom: 1rem;

    ${mediaqueries.desktop`
      margin-top: 0;
      margin-bottom: 0.75rem;
    `};
  }

  a,
  a * {
    color: ${p => p.theme.mode.links};
    ${transitionColor};

    &:visited {
      color: ${p => p.theme.mode.links};
      opacity: 0.85;
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  figure {
    margin-bottom: 0;

    img {
      margin-bottom: 15px;
    }

    figcaption {
      ${articleWidth};
      font-family: ${p => p.theme.fontfamily.sansSerif};
      color: ${p => p.theme.mode.text};
      opacity: 0.5;
      font-size: 16px;
      display: block;
      margin-bottom: 60px;

      ${mediaqueries.tablet`
        margin-bottom: 30px;
        font-size: 18px;
      `}
    }
  }

  blockquote {
    position: relative;
    ${articleWidth};
    font-style: italic;
    ${transitionColor};

    p {
      position: relative;
      padding-left: 30px;
      margin: 30px auto 65px;

      &::before {
        content: '';
        position: absolute;
        width: 2px;
        left: 0;
        top: 8px;
        bottom: 8px;
        background: ${p => p.theme.mode.text};
      }

      ${mediaqueries.tablet`
        margin: 15px auto 45px;
      `}
    }
  }

  blockquote.pull__quote {
    margin: 30px auto 65px;
    line-height: 1.25;
    max-width: 780px;
    color: ${p => p.theme.mode.text};
    font-family: ${p => p.theme.fontfamily.serif};
    font-size: 36px;
    font-style: italic;
    ${transitionColor};

    ${mediaqueries.tablet`
      margin: 0 auto 30px;
      padding: 20px;
    `}
  }

  ul,
  ol {
    ${articleWidth} list-style: none;
    counter-reset: list;
    color: ${p => p.theme.mode.text};
    ${transitionColor};
    position: relative;
    padding-left: 30px;
    margin-bottom: 2rem;

    li {
      position: relative;
      margin-bottom: 5px;

      ${mediaqueries.tablet`
          padding-left: 20px;
        `}

      p {
        ${mediaqueries.tablet`
          padding: 0;
        `}
      }
    }

    li > * {
      display: inline;
    }

    li::before {
      width: 3rem;
      display: inline-block;
      position: absolute;
      color: ${p => p.theme.colors.grey.mid};
    }
  }

  ul li::before {
    content: '';
    position: absolute;
    left: -3rem;
    top: 1.5rem;
    height: 8px;
    width: 8px;
    background: ${p => p.theme.mode.text};

    ${mediaqueries.tablet`
      left: 0;
    `}
  }

  ol li::before {
    counter-increment: list;
    content: counter(list) '.';
    font-weight: 600;
    position: absolute;
    left: -3rem;
    top: 0.85rem;

    ${mediaqueries.tablet`
      left: 0;
    `}
  }

  p {
    ${articleWidth};
    margin-bottom: 30px;
    line-height: 1.55;
    font-size: 22px;
    color: ${p => p.theme.mode.text};


    b {
      font-weight: 800;
    }
  }

  img {
    display: block;
    position: relative;
    max-width: 100%;
    z-index: 0;
    margin: 30px auto 55px;
    border-radius: 5px;

    ${mediaqueries.tablet`
      margin: 20px auto 45px;
    `}
  }

  img.image__with_shadow {
    box-shadow: 0px 15px 60px rgba(0, 0, 0, 0.15);
  }

  img.image__regular {
    width: 100%;
    max-width: ${imageWidths.regular};

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
    `}
  }

  img.image__large {
    width: 100%;
    max-width: ${imageWidths.large};

    ${mediaqueries.tablet`
      border-radius: 0;
    `}
  }

  img.image__full {
    width: 100%;
    max-width: ${imageWidths.full};
    border-radius: 0;
  }

  table {
    ${articleWidth};
    width: 100%;
    border-collapse: collapse;
    border-top: 1px solid #dfe3e8;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
    color: ${p => p.theme.mode.text};
  }

  th {
    text-transform: uppercase;
    font-weight: 600;
  }

  tr {
    &:hover {
      background-color: #f4f6f8;
    }
  }

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #dfe3e8;
    vertical-align: top;
    white-space: nowrap;
  }

  hr {
    width: 250px;
    height: 1px;
    margin: 30px auto;
    opacity: 0.33;
  }

  .twitter-tweet {
    text-align: center;
    margin: 0 auto;
    padding: 20px 0 55px 0;
    width: 540px !important;
  }

  hr {
    ${articleWidth};
    position: relative;
    width: 100%;
    margin: 25px auto 60px;
    border: 0;
    height: 14.36px;
    background-image: url("${p => p.theme.mode.hr}");
    background-repeat: repeat-x;
    box-sizing: border-box;

    ${mediaqueries.tablet`
      width: calc(100vw - 40px);
      margin: 0px auto 50px;
    `};
  }
`
