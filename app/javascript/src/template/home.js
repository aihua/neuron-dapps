import j from 'jquery'
import { log } from '../utils'
import noData from 'src/imgs/noData.png'
import defaultimg from 'src/imgs/noData.png'

const tBannerimg = ({ image_url: img }) => {
  let realimg = img || defaultimg
  const t = `
    <img class='bannerimg banneranime' src=${realimg} alt="">
  `
  return t
}

const tBanner = (list) => {
  const l = list
  if (l.length === 0) {
    return ''
  }
  const len = l.length
  let t = ''
  for (let i = 0; i < len; i++) {
    const info = l[i]
    t += tBannerimg(info)
  }
  t = `
    <div class='banner'>
      ${t}
    </div>
  `
  return t
}

const dappshowPath = (id) => {
  return `/dapps/${id}`
}

const tDappblocksCell = (list) => {
  let t = ''
  list.forEach((info) => {
    const { name, logo_url, intro, id } = info
    t += `
         <a class="dapp" href=${dappshowPath(id)}>
          <img class="dappimg" src=${logo_url}>
          <div class="dappinfo">
            <div class="dapptitle">
              ${name}
            </div>
            <div class="dappintro">${intro}</div>
          </div>
        </a>
        `
  })
  return t
}

const dappmorePath = (name) => {
  return `/more/${name}`
}

const tDappblocks = (list) => {
  let t = ''
  list.forEach((info) => {
    const { type, value } = info
    const cell = tDappblocksCell(value)
    t += `
    <div class="block">
      <div class="header">
        <div class="headertitle">
          ${type}
        </div>
        <a href=${dappmorePath(type)} class="buttonmore">更多</a>
      </div>
      <div class="dapplist">
        ${cell}
      </div>
    </div>
    `
  })
  return t
}

const tDefault = () => {
  const t = `<div class="noData">
                <img class="noDataImg" src="${noData}" alt="">
                <span class="noDataText">无数据显示</span>
              </div>`
  return t
}

const renderbyList = (container, list) => {
  const html = tBanner(list)
  if (html === '') {
    container.html(tDefault())
  } else {
    container.html(html)
  }
}

const renderBlockbyList = (container, list) => {
  const html = tDappblocks(list)
  container.html(html)
}

export { renderbyList, tDappblocks, renderBlockbyList, tBannerimg, dappshowPath }