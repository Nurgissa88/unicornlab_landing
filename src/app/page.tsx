"use client"

import { useRef, useState } from "react"
import gsap from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { Link } from "next-view-transitions"

import RfqForm from "@/components/rfq/RfqForm"
import { siteConfig } from "@/content/site"

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  MorphSVGPlugin,
  DrawSVGPlugin
)

export default function HomePage() {
  const [isRfqOpen, setIsRfqOpen] = useState(false)
  const pageRef = useRef<HTMLElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isHeroCursorActiveRef = useRef(false)
  const isRfqClosingRef = useRef(false)
  const scrollBlockAbortRef = useRef<AbortController | null>(null)
  const strips = Array.from({ length: 5 })
  const logoSymbolPaths = [
    "M107.764 88.0309C105.087 127.551 72.1721 142.173 35.4902 134.467L36.6799 128.243C61.8615 132.096 96.8581 121.228 99.634 87.6357L107.764 88.0309Z",
    "M84.071 109.174C54.3289 135.258 20.4229 122.414 0 91.0939L5.1553 87.5371C20.2246 108.088 52.7427 124.982 78.5191 103.246L84.071 109.174Z",
    "M52.1451 107.494C12.489 104.728 -2.18378 72.025 5.54916 35.3701L11.795 36.5557C7.92854 61.7498 18.834 96.5275 52.5417 99.3927L52.1451 107.494Z",
    "M30.8324 83.7826C4.65941 53.5497 17.5477 20.3528 48.9751 0L52.5442 5.23641C32.0222 20.254 14.97 52.5617 36.88 78.3486L30.8324 83.7826Z",
    "M32.6152 51.9687C35.292 12.4486 68.2066 -2.17384 104.889 5.53258L103.699 11.757C78.5172 7.90378 43.5207 18.7718 40.7447 52.3639L32.6152 51.9687Z",
    "M56.0098 30.7267C85.7519 4.7422 119.559 17.5862 140.081 48.9059L135.322 52.4627C120.253 31.9123 87.7346 15.0174 61.9582 36.7535L56.0098 30.7267Z",
    "M88.2345 32.5049C127.891 35.2713 142.563 67.9742 134.83 104.53L128.585 102.949C132.55 77.8542 121.546 43.0765 87.8379 40.2113L88.2345 32.5049Z",
    "M109.55 56.2178C135.723 85.8578 122.834 119.648 91.4069 140L87.8379 134.764C108.36 119.746 125.412 87.4386 103.601 61.6518L109.55 56.2178Z",
  ]
  const logoWordPaths = [
    "M206.831 27.8174V22.3124V16.1191H198.15H193.12V23.6886L180 17.7903V100.072H193.711V28.0141L206.831 34.0107V27.8174Z",
    "M239.187 38.729C235.321 38.4917 231.461 39.2757 227.997 41.0019C224.533 42.728 221.587 45.3351 219.458 48.5595V40.4002H206.832V94.173L219.656 99.973V71.8578C219.173 66.2369 220.789 60.6361 224.193 56.129C225.676 54.4138 227.529 53.0545 229.613 52.1524C231.696 51.2502 233.958 50.8286 236.228 50.9188C238.173 50.7895 240.124 51.0634 241.958 51.7233C243.791 52.3832 245.468 53.4147 246.881 54.7527C248.228 56.275 249.254 58.0515 249.898 59.9767C250.542 61.9019 250.791 63.9365 250.63 65.9595V100.071H263.552V64.2883C263.757 60.8859 263.288 57.4765 262.171 54.2548C261.054 51.0331 259.311 48.0623 257.042 45.512C254.698 43.2121 251.901 41.4217 248.828 40.2541C245.755 39.0866 242.472 38.5673 239.187 38.729Z",
    "M324.809 52.1968L305.08 50.329C301.611 50.2617 298.216 49.3143 295.216 47.5764C294.21 46.8745 293.401 45.928 292.866 44.8268C292.331 43.7257 292.087 42.5064 292.158 41.2849C292.151 39.5527 292.604 37.8494 293.47 36.3475C294.336 34.8456 295.585 33.5985 297.09 32.7324C301.139 30.2418 305.853 29.0415 310.604 29.2917C315.625 29.2792 320.548 30.676 324.809 33.3222C328.693 35.6055 331.763 39.043 333.588 43.1527H349.568C346.674 35.215 341.406 28.3528 334.476 23.4917C327.419 18.8945 319.132 16.5301 310.703 16.7086C304.808 16.5899 298.956 17.7296 293.539 20.051C288.927 22.04 284.94 25.2325 281.998 29.2917C279.339 33.1347 277.927 37.6983 277.953 42.3663C277.767 45.2438 278.219 48.1268 279.276 50.811C280.333 53.4952 281.969 55.9148 284.069 57.8985C289.8 62.0808 296.695 64.3827 303.798 64.4849L323.527 66.2544C327.033 66.3501 330.445 67.4043 333.391 69.3019C334.433 70.1504 335.255 71.2366 335.787 72.4686C336.32 73.7005 336.547 75.0421 336.449 76.3798C336.458 78.2286 335.991 80.0488 335.093 81.6666C334.195 83.2844 332.896 84.6457 331.319 85.6205C326.893 88.2569 321.767 89.491 316.622 89.1595C311.289 89.3429 306.006 88.0861 301.332 85.5222C297.343 83.3096 294.191 79.8571 292.355 75.6917H276.572C279.523 83.682 284.903 90.5552 291.961 95.3527C299.389 100.019 308.041 102.38 316.819 102.136C323.048 102.316 329.242 101.142 334.969 98.6951C339.782 96.6226 343.893 93.209 346.806 88.8646C349.567 84.9175 351.016 80.2073 350.949 75.3968C351.105 72.4256 350.632 69.455 349.561 66.6777C348.491 63.9003 346.846 61.3782 344.735 59.2747C339.058 54.7903 332.052 52.3019 324.809 52.1968Z",
    "M417.631 54.3601C415.014 49.3953 411.004 45.2965 406.09 42.5635C401.243 39.9479 395.819 38.5781 390.307 38.5781C384.795 38.5781 379.371 39.9479 374.524 42.5635C369.739 45.2986 365.785 49.2729 363.081 54.0652C360.312 58.9152 358.882 64.4105 358.938 69.9906C358.845 75.6208 360.132 81.1887 362.687 86.211C365.165 90.9612 369.013 94.8641 373.735 97.4178C378.894 100.243 384.719 101.635 390.603 101.448C397.524 101.681 404.368 99.9421 410.332 96.4347C413.89 94.1325 416.862 91.0361 419.012 87.3906L406.879 82.4754C405.479 84.889 403.428 86.864 400.96 88.1771C397.683 89.7964 394.063 90.6056 390.406 90.5364C388.085 90.6824 385.759 90.3624 383.565 89.5954C381.371 88.8284 379.354 87.63 377.633 86.0713C375.913 84.5126 374.524 82.6254 373.549 80.5217C372.575 78.4179 372.034 76.1405 371.959 73.8245H421.774C422.09 67.0897 420.664 60.387 417.631 54.3601ZM372.748 64.1906C373.647 60.284 375.878 56.8093 379.062 54.3601C382.412 51.9671 386.431 50.6802 390.554 50.6802C394.676 50.6802 398.695 51.9671 402.046 54.3601C405.229 56.8093 407.46 60.284 408.359 64.1906H372.748Z",
    "M488.261 54.3599C485.643 49.395 481.633 45.2963 476.719 42.5633C471.962 40.0088 466.636 38.6903 461.232 38.7294C455.571 38.7357 450.016 40.2639 445.153 43.1531C440.368 45.8882 436.414 49.8625 433.711 54.6548C430.911 59.497 429.447 64.9917 429.469 70.5802C429.361 76.2235 430.684 81.8028 433.316 86.8005C435.795 91.5508 439.642 95.4536 444.364 98.0073C449.523 100.833 455.349 102.225 461.232 102.038C468.153 102.271 474.997 100.532 480.961 97.0243C484.52 94.7221 487.492 91.6257 489.642 87.9802L477.804 82.4751C476.404 84.8888 474.354 86.8638 471.886 88.1768C468.608 89.7961 464.988 90.6054 461.331 90.5361C459.01 90.6822 456.684 90.3622 454.49 89.5952C452.296 88.8281 450.279 87.6297 448.558 86.0711C446.838 84.5124 445.449 82.6252 444.475 80.5214C443.5 78.4177 442.959 76.1402 442.885 73.8243H492.7C492.924 67.0636 491.395 60.3595 488.261 54.3599ZM443.378 64.1904C444.237 60.2673 446.476 56.7801 449.691 54.3599C452.969 51.867 457.012 50.5818 461.134 50.7226C465.281 50.6144 469.344 51.8951 472.675 54.3599C475.858 56.8091 478.09 60.2837 478.988 64.1904H443.378Z",
    "M536.695 62.3222L564.907 40.4002H547.348L516.473 64.0917V17.79H503.551V94.0748V100.071H516.473V99.8748V77.5595L526.14 69.8917L549.124 100.071H565.499L536.695 62.3222Z",
  ]
  const workIconSeedPath = "M256 256 C256 256 256 256 256 256"
  const workIconPaths = {
    analysis: [
      "M281.167,409.359c-3.74,0-6.774,3.033-6.774,6.773v10.201H52.458V135.988h10.938c3.742,0,6.774-3.032,6.774-6.774 c0-3.741-3.033-6.773-6.774-6.773H45.684c-3.742,0-6.774,3.032-6.774,6.773v303.895c0,3.74,3.033,6.774,6.774,6.774h235.483 c3.74,0,6.774-3.034,6.774-6.774v-16.976C287.941,412.393,284.907,409.359,281.167,409.359z",
      "M326.975,337.393c-3.741,0-6.774,3.032-6.774,6.773v37.652H98.265V91.473h106.182c3.742,0,6.774-3.033,6.774-6.774 s-3.033-6.774-6.774-6.774H91.49c-3.741,0-6.774,3.033-6.774,6.774v303.894c0,3.742,3.033,6.774,6.774,6.774h235.484 c3.74,0,6.773-3.032,6.773-6.774v-44.426C333.748,340.425,330.715,337.393,326.975,337.393z",
      "M326.975,145.359c-3.741,0-6.774,3.033-6.774,6.774v89.826c0,3.741,3.033,6.774,6.774,6.774 c3.74,0,6.773-3.033,6.773-6.774v-89.826C333.748,148.393,330.715,145.359,326.975,145.359z",
      "M128.828,357.518h31.519c3.741,0,6.774-3.033,6.774-6.774v-69.582c0-3.741-3.033-6.774-6.774-6.774h-31.519 c-3.742,0-6.774,3.033-6.774,6.774v69.582C122.054,354.484,125.086,357.518,128.828,357.518z M135.602,287.936h17.97v56.033h-17.97 V287.936z",
      "M196.65,297.088c-3.742,0-6.774,3.032-6.774,6.773v46.882c0,3.741,3.033,6.774,6.774,6.774h31.519 c3.741,0,6.774-3.033,6.774-6.774v-23.201c0-3.741-3.033-6.774-6.774-6.774c-3.742,0-6.774,3.033-6.774,6.774v16.427h-17.97 v-40.107C203.424,300.12,200.392,297.088,196.65,297.088z",
      "M264.472,332.805c-3.74,0-6.774,3.033-6.774,6.774v11.164c0,3.741,3.034,6.774,6.774,6.774h31.52 c3.74,0,6.774-3.033,6.774-6.774v-11.164c0-3.741-3.034-6.774-6.774-6.774c-3.741,0-6.774,3.033-6.774,6.774v4.39h-17.971v-4.39 C271.246,335.838,268.212,332.805,264.472,332.805z",
      "M285.234,147.596c-2.646-2.645-6.933-2.646-9.579,0.001l-45.845,45.845c-2.646,2.646-2.646,6.934,0.001,9.58 c2.644,2.645,6.934,2.646,9.58-0.001l41.054-41.054l7.945,7.945l-50.506,50.506c-2.646,2.646-2.646,6.936,0,9.581 c1.323,1.322,3.057,1.984,4.791,1.984c1.733,0,3.467-0.662,4.79-1.984l55.297-55.296c1.271-1.271,1.984-2.994,1.984-4.791 c0-1.796-0.714-3.52-1.984-4.79L285.234,147.596z",
      "M133.228,241.125c1.323,1.321,3.057,1.983,4.791,1.983s3.468-0.662,4.791-1.983l17.884-17.885 c2.646-2.646,2.646-6.935,0-9.581c-2.646-2.645-6.935-2.645-9.581,0l-13.094,13.095l-7.946-7.946l30.621-30.62 c2.646-2.646,2.646-6.935,0-9.58c-2.646-2.645-6.935-2.645-9.581,0l-35.41,35.41c-2.646,2.646-2.646,6.935,0,9.581L133.228,241.125 z",
      "M465.489,330.97l-39.484-39.484c-2.646-2.645-6.933-2.645-9.579,0c-2.646,2.646-2.646,6.935,0,9.581l39.484,39.484 c2.35,2.351,3.645,5.476,3.645,8.8c0,3.323-1.295,6.448-3.645,8.8c-4.854,4.854-12.746,4.854-17.601,0l-62.422-62.422 c28.195-23.148,46.216-58.255,46.216-97.497c0-69.54-56.573-126.114-126.112-126.114c-69.54,0-126.114,56.574-126.114,126.114 s56.574,126.113,126.114,126.113c25.385,0,49.023-7.564,68.831-20.521l63.908,63.906c4.909,4.909,11.438,7.613,18.38,7.613 s13.471-2.704,18.379-7.613C475.625,357.596,475.625,341.104,465.489,330.97z M295.991,310.797 c-62.069,0-112.565-50.497-112.565-112.565c0-62.069,50.497-112.565,112.565-112.565c62.067,0,112.564,50.496,112.564,112.565 C408.556,260.3,358.059,310.797,295.991,310.797z",
      "M295.991,105.72c-51.012,0-92.512,41.501-92.512,92.512s41.5,92.511,92.512,92.511c51.011,0,92.51-41.5,92.51-92.511 S347.002,105.72,295.991,105.72z M295.991,277.193c-43.541,0-78.964-35.422-78.964-78.962s35.423-78.963,78.964-78.963 c43.539,0,78.962,35.423,78.962,78.963S339.53,277.193,295.991,277.193z",
      "M125.331,135.604v-9.918c0-3.741-3.033-6.774-6.774-6.774c-3.742,0-6.774,3.033-6.774,6.774v9.918 c0,3.742,3.033,6.774,6.774,6.774C122.298,142.379,125.331,139.347,125.331,135.604z",
      "M147.423,135.604v-21.235c0-3.741-3.033-6.774-6.774-6.774c-3.741,0-6.774,3.033-6.774,6.774v21.235 c0,3.742,3.033,6.774,6.774,6.774C144.39,142.379,147.423,139.347,147.423,135.604z",
      "M169.516,135.604v-3.455c0-3.741-3.033-6.774-6.774-6.774c-3.741,0-6.774,3.033-6.774,6.774v3.455 c0,3.742,3.033,6.774,6.774,6.774C166.483,142.379,169.516,139.347,169.516,135.604z",
    ],
    engineering: [
      "M504.642,207.408l-44.917-4.491c-4.868-18.741-12.299-36.659-22.152-53.415l28.603-34.96 c2.657-3.248,2.423-7.983-0.546-10.95L408.409,46.37c-2.969-2.967-7.701-3.205-10.951-0.546l-34.96,28.603 c-16.757-9.853-34.673-17.285-53.415-22.152l-4.491-44.917c-0.418-4.178-3.933-7.359-8.13-7.359h-80.923 c-4.198,0-7.712,3.181-8.13,7.356l-4.491,44.917c-18.741,4.868-36.658,12.3-53.415,22.152l-34.96-28.603 c-3.248-2.658-7.983-2.423-10.951,0.546l-57.223,57.224c-2.969,2.969-3.203,7.702-0.546,10.95l28.603,34.96 c-9.853,16.755-17.284,34.673-22.152,53.415l-44.917,4.491C3.181,207.826,0,211.341,0,215.538v80.924 c0,4.197,3.181,7.713,7.358,8.13l44.917,4.491c4.868,18.741,12.299,36.659,22.152,53.415l-28.603,34.96 c-2.657,3.248-2.423,7.983,0.546,10.95l57.222,57.222c2.969,2.969,7.702,3.205,10.951,0.546l34.96-28.603 c16.757,9.853,34.673,17.285,53.415,22.152l4.491,44.917c0.418,4.175,3.932,7.356,8.13,7.356h80.923 c4.198,0,7.712-3.181,8.13-7.356l4.491-44.917c18.741-4.868,36.658-12.3,53.415-22.152l34.96,28.603 c3.247,2.657,7.982,2.422,10.951-0.546l57.222-57.222c2.969-2.969,3.203-7.702,0.546-10.95l-28.603-34.96 c9.853-16.755,17.284-34.673,22.152-53.415l44.917-4.491c4.177-0.417,7.358-3.933,7.358-8.13v-80.924 C512,211.341,508.819,207.826,504.642,207.408z M495.66,289.068l-43.308,4.331c-3.487,0.349-6.364,2.882-7.149,6.299 c-4.817,20.948-13.072,40.855-24.536,59.166c-1.859,2.971-1.617,6.797,0.602,9.509l27.579,33.709l-46.766,46.765l-33.708-27.58 c-2.711-2.221-6.538-2.462-9.509-0.601c-18.313,11.463-38.219,19.72-59.167,24.537c-3.416,0.785-5.95,3.661-6.299,7.149 l-4.332,43.308h-66.136l-4.331-43.308c-0.349-3.487-2.882-6.364-6.299-7.149c-20.947-4.817-40.854-13.072-59.167-24.537 c-2.97-1.861-6.797-1.617-9.509,0.601l-33.708,27.58l-46.766-46.765l27.579-33.709c2.219-2.713,2.462-6.538,0.602-9.509 c-11.463-18.311-19.72-38.217-24.536-59.167c-0.786-3.416-3.662-5.95-7.149-6.299l-43.308-4.331v-66.136l43.308-4.331 c3.487-0.349,6.364-2.882,7.149-6.299c4.817-20.948,13.072-40.855,24.536-59.167c1.86-2.971,1.617-6.797-0.602-9.509 l-27.579-33.709l46.766-46.765l33.708,27.58c2.711,2.22,6.539,2.462,9.509,0.601c18.313-11.463,38.219-19.72,59.167-24.537 c3.416-0.785,5.95-3.661,6.299-7.149l4.332-43.306h66.136l4.331,43.308c0.349,3.487,2.882,6.364,6.299,7.149 c20.947,4.817,40.854,13.072,59.166,24.537c2.971,1.861,6.797,1.618,9.509-0.601l33.708-27.581l46.766,46.765l-27.579,33.709 c-2.219,2.713-2.462,6.538-0.602,9.509c11.463,18.311,19.72,38.217,24.536,59.167c0.786,3.416,3.662,5.95,7.149,6.299 l43.307,4.331V289.068z",
      "M256.002,171.575c-46.552,0-84.426,37.873-84.426,84.426s37.874,84.426,84.426,84.426 c46.552,0,84.426-37.873,84.426-84.426S302.554,171.575,256.002,171.575z M323.58,247.83h-34.136 c-0.715-20.686-4.154-41.364-10.591-55.958C302.719,200.403,320.462,221.895,323.58,247.83z M233.159,191.87 c-6.44,14.595-9.884,35.27-10.599,55.961h-34.135C191.542,221.893,209.288,200.398,233.159,191.87z M188.425,264.171h34.135 c0.715,20.692,4.16,41.366,10.603,55.962C209.289,311.605,191.542,290.11,188.425,264.171z M266.224,307.338 c-4.589,13.767-9.302,16.748-10.223,16.748c-0.921,0-5.633-2.98-10.223-16.748c-3.891-11.674-6.276-26.774-6.873-43.167h34.191 C272.499,280.563,270.116,295.664,266.224,307.338z M238.908,247.83c0.597-16.393,2.981-31.493,6.873-43.167 c4.588-13.767,9.301-16.748,10.222-16.748c0.92,0,5.633,2.98,10.223,16.748c3.891,11.674,6.276,26.774,6.873,43.167H238.908z M278.849,320.13c6.439-14.594,9.881-35.271,10.595-55.959h34.135C320.462,290.107,302.718,311.6,278.849,320.13z",
      "M256.002,77.89c-44.587,0-87.251,16.556-120.134,46.619c-32.668,29.866-52.966,70.484-57.154,114.373 c-0.429,4.491,2.865,8.481,7.356,8.91c4.521,0.431,8.482-2.865,8.91-7.358c7.955-83.35,77.179-146.204,161.022-146.204 c89.2,0,161.77,72.57,161.77,161.77s-72.57,161.77-161.77,161.77c-83.845,0-153.069-62.856-161.022-146.208 c-0.428-4.492-4.432-7.785-8.909-7.358c-4.493,0.429-7.786,4.417-7.358,8.91c4.188,43.889,24.484,84.509,57.152,114.376 c32.885,30.063,75.549,46.62,120.136,46.62c98.21,0,178.111-79.9,178.111-178.111S354.213,77.89,256.002,77.89z",
      "M256.002,138.894c-25.202,0-49.22,7.89-69.452,22.818c-3.632,2.679-4.403,7.793-1.724,11.425 c2.68,3.632,7.794,4.404,11.424,1.724c17.405-12.839,38.066-19.626,59.753-19.626c55.563,0,100.766,45.203,100.766,100.766 c0,55.563-45.203,100.766-100.766,100.766s-100.766-45.203-100.766-100.766c0-21.688,6.787-42.351,19.629-59.756 c2.678-3.632,1.906-8.746-1.724-11.425c-3.633-2.679-8.745-1.907-11.425,1.723c-14.929,20.234-22.82,44.252-22.82,69.457 c0,64.573,52.534,117.106,117.106,117.106c64.572,0,117.106-52.533,117.106-117.106S320.574,138.894,256.002,138.894z",
    ],
    support: [
      "M208,112c-52.936,0-96,43.064-96,96c0,52.936,43.064,96,96,96c52.936,0,96-43.064,96-96C304,155.064,260.936,112,208,112 z M208,288c-39.92,0-73.008-29.424-78.952-67.704C140.712,230.56,166.584,248,208,248s67.288-17.44,78.952-27.704 C281.008,258.576,247.92,288,208,288z M172.872,226.728c-16.656-5.312-27.76-13.448-33.64-18.704 c5.88-5.224,17.008-13.368,33.608-18.704c-2.984,5.608-4.84,11.896-4.84,18.68C168,214.8,169.864,221.112,172.872,226.728z M184,208c0-13.232,10.768-24,24-24s24,10.768,24,24s-10.768,24-24,24S184,221.232,184,208z M243.128,189.272 c16.664,5.312,27.768,13.456,33.64,18.704c-5.88,5.224-17.008,13.368-33.608,18.704c2.984-5.6,4.84-11.896,4.84-18.68 C248,201.2,246.136,194.888,243.128,189.272z M208,168c-41.416,0-67.288,17.44-78.952,27.704C134.992,157.424,168.08,128,208,128 s73.008,29.424,78.952,67.704C275.288,185.44,249.416,168,208,168z",
      "M482.056,414.744L391.312,324l14.344-14.344l-11.312-11.312L380,312.688l-18.768-18.768 c8.232-14.608,14.392-29.976,18.112-45.92H416v-80h-36.656c-4.36-18.848-11.688-36.608-21.848-52.92l25.864-25.872l-56.56-56.56 l-25.872,25.864c-16.32-10.168-34.08-17.496-52.928-21.856V0h-80v36.656c-18.848,4.36-36.608,11.688-52.92,21.848L89.2,32.64 L32.64,89.2l25.864,25.872c-10.16,16.32-17.488,34.08-21.848,52.928H0v80h36.656c4.36,18.848,11.688,36.608,21.848,52.92 L32.64,326.8l56.56,56.56l25.872-25.864c16.312,10.168,34.072,17.496,52.92,21.848V416h80v-36.656 c15.944-3.728,31.304-9.88,45.92-18.112L312.68,380l-14.344,14.344l11.312,11.312l14.344-14.344l90.744,90.744 c9,8.992,20.952,13.944,33.664,13.944c26.248,0,47.6-21.352,47.6-47.6C496,435.688,491.048,423.736,482.056,414.744z M238.488,365.008L232,366.256V400h-48v-33.736l-6.488-1.248c-21.336-4.12-41.192-12.32-59.032-24.384l-5.472-3.704 l-23.816,23.808L55.264,326.8l23.808-23.816l-3.704-5.472c-12.064-17.832-20.264-37.696-24.384-59.032L49.736,232H16v-48h33.736 l1.248-6.488c4.12-21.336,12.32-41.192,24.384-59.032l3.704-5.472L55.264,89.2L89.2,55.264l23.816,23.808l5.472-3.704 c17.832-12.064,37.696-20.264,59.032-24.384l6.48-1.248V16h48v33.736l6.488,1.248c21.336,4.12,41.192,12.32,59.032,24.384 l5.472,3.704l23.816-23.808L360.744,89.2l-23.808,23.816l3.704,5.472c12.064,17.832,20.264,37.696,24.384,59.032l1.24,6.48H400 v48h-33.744l-1.248,6.488c-2.904,15.12-8.216,29.736-15.56,43.648l-11.824-11.824C346.736,251.424,352,230.336,352,208 c0-79.4-64.6-144-144-144S64,128.6,64,208s64.6,144,144,144c22.336,0,43.424-5.264,62.304-14.376l11.824,11.824 C268.216,356.792,253.608,362.104,238.488,365.008z M336,208c0,70.576-57.424,128-128,128S80,278.576,80,208S137.424,80,208,80 S336,137.424,336,208z M284.864,329.552c18-11.424,33.264-26.688,44.688-44.688L368.688,324L324,368.688L284.864,329.552z M448.4,480c-8.44,0-16.376-3.288-22.344-9.256L335.312,380L380,335.312l90.744,90.744C476.712,432.024,480,439.96,480,448.4 C480,465.824,465.824,480,448.4,480z",
    ],
  }
  const workIconLayerCount = Math.max(
    ...Object.values(workIconPaths).map((paths) => paths.length)
  )
  const workItems = [
    {
      markPaths: workIconPaths.analysis,
      title: "Анализ задач и подбор оптимального решения",
      text: "Разбираем технические требования, бюджет и регуляторный контекст — предлагаем конфигурацию, которая решает именно вашу задачу.",
    },
    {
      markPaths: workIconPaths.engineering,
      title: "Инжиниринговая поддержка и адаптация оборудования",
      text: "Дорабатываем поставки под требования заказчика: интерфейсы, расходники, методическая совместимость, интеграция в существующую лабораторию.",
    },
    {
      markPaths: workIconPaths.support,
      title: "Долгосрочное сервисное и методическое сопровождение",
      text: "Не оставляем оборудование «у вас на столе»: обновления методик, обучение персонала, сервис и поддержка пользователей на протяжении всего жизненного цикла.",
    },
  ]
  const processItems = [
    {
      eyebrow: "Этап 01 / подбор",
      label: "Подбор",
      title: "Подбор оборудования",
      text: "Сбор требований, технико-экономическое сравнение конфигураций разных производителей, формирование оптимального предложения с учетом бюджета и задач.",
    },
    {
      eyebrow: "Этап 02 / поставка",
      label: "Поставка",
      title: "Поставка",
      text: "Контрактация с производителем, логистика и таможенное оформление, контроль сроков и сохранности груза до объекта заказчика.",
    },
    {
      eyebrow: "Этап 03 / монтаж",
      label: "Монтаж",
      title: "Монтаж",
      text: "Подготовка помещения, установка оборудования, подключение коммуникаций и периферии в соответствии с требованиями производителя.",
    },
    {
      eyebrow: "Этап 04 / пусконаладка",
      label: "Пусконаладка",
      title: "Пусконаладка",
      text: "Запуск, тестовые прогоны, проверка штатных режимов работы и базовых характеристик до передачи в эксплуатацию.",
    },
    {
      eyebrow: "Этап 05 / квалификация",
      label: "Квалификация",
      title: "Квалификация (IQ/OQ/PQ)",
      text: "Документированное подтверждение соответствия установленным требованиям с протоколами IQ/OQ/PQ, готовыми к аудиту.",
    },
    {
      eyebrow: "Этап 06 / поддержка",
      label: "Поддержка",
      title: "Методическая поддержка",
      text: "Перенос и валидация аналитических методик, обучение операторов, консультации по работе с прибором и расходникам.",
    },
  ]

  const closeRfqModal = () => {
    if (isRfqClosingRef.current) {
      return
    }

    const modal = document.querySelector<HTMLElement>(".rfq-modal")

    if (!modal) {
      scrollBlockAbortRef.current?.abort()
      scrollBlockAbortRef.current = null
      setIsRfqOpen(false)
      return
    }

    isRfqClosingRef.current = true

    gsap.to(modal, {
      xPercent: 100,
      duration: 0.62,
      ease: "power4.inOut",
      onComplete: () => {
        scrollBlockAbortRef.current?.abort()
        scrollBlockAbortRef.current = null
        isRfqClosingRef.current = false
        setIsRfqOpen(false)
      },
    })
  }

  useGSAP(
    () => {
      const fitTitleToScreen = () => {
        const title = titleRef.current

        if (!title) {
          return
        }

        gsap.set(title, { scaleX: 1 })

        const titleWidth = title.offsetWidth
        const safeWidth = window.innerWidth - 48

        if (titleWidth > 0) {
          gsap.set(title, {
            scaleX: safeWidth / titleWidth,
          })
        }
      }

      void document.fonts.ready.then(fitTitleToScreen)
      fitTitleToScreen()
      const setHeroCursorActive = (isActive: boolean) => {
        isHeroCursorActiveRef.current = isActive

        if (curtainRef.current) {
          curtainRef.current.style.cursor = isActive ? "none" : ""
        }
      }

      const talkCursor = document.querySelector<HTMLElement>(".talk-cursor")
      const moveCursorX = talkCursor
        ? gsap.quickTo(talkCursor, "x", { duration: 0.24, ease: "power3.out" })
        : null
      const moveCursorY = talkCursor
        ? gsap.quickTo(talkCursor, "y", { duration: 0.24, ease: "power3.out" })
        : null

      const handleMouseMove = (event: MouseEvent) => {
        moveCursorX?.(event.clientX)
        moveCursorY?.(event.clientY)
      }

      window.addEventListener("mousemove", handleMouseMove)
      gsap.set(".hero-copy", { autoAlpha: 1 })
      gsap.set(".hero-copy-line", { yPercent: 110 })
      gsap.set(".section-kicker", { autoAlpha: 0, y: -12 })
      gsap.set(".talk-cursor", {
        autoAlpha: 0,
        scale: 0.72,
        xPercent: -50,
        yPercent: -50,
      })
      gsap.set(".white-screen-strip", { yPercent: 100 })
      gsap.set(".work-kicker", { autoAlpha: 0, y: -12 })
      gsap.set(".work-title-line", { yPercent: 110 })
      gsap.set(".work-summary", { autoAlpha: 0, y: 28 })
      gsap.set(".work-card-shell", { autoAlpha: 0, y: 36 })
      gsap.set(".work-card-content", { autoAlpha: 0 })
      gsap.set(".work-card-title, .work-card-text", {
        autoAlpha: 0,
        y: 18,
        clipPath: "inset(0% 0% 100% 0%)",
      })
      gsap.set(".work-card-mark-path", {
        attr: { d: workIconSeedPath },
        autoAlpha: 0,
      })
      gsap.set(".process-screen", { yPercent: 100 })
      gsap.set(".process-kicker", { autoAlpha: 0, y: -12 })
      gsap.set(".process-title-line", { yPercent: 110 })
      gsap.set(".process-summary", { autoAlpha: 0, y: 28 })
      gsap.set(".process-card", { autoAlpha: 0, y: 32 })
      gsap.set(".process-card-content", {
        autoAlpha: 0,
        y: 28,
        filter: "blur(10px)",
      })
      gsap.set(".process-card-content > *", { autoAlpha: 0, y: 22 })
      gsap.set(".catalog-screen", { yPercent: 100 })
      gsap.set(".catalog-kicker", { autoAlpha: 0, y: -12 })
      gsap.set(".catalog-title-line", { yPercent: 110 })
      gsap.set(".catalog-copy", { autoAlpha: 0, y: 24 })
      gsap.set(".catalog-link", { autoAlpha: 0, y: 34 })
      gsap.set(".contacts-screen", { yPercent: 100 })
      gsap.set(".contacts-kicker", { autoAlpha: 0, y: -12 })
      gsap.set(".contacts-title-line", { yPercent: 110 })
      gsap.set(".contacts-copy", { autoAlpha: 0, y: 24 })
      gsap.set(".contacts-item", { autoAlpha: 0, y: 24 })
      gsap.set(".inseek-symbol-fill", {
        opacity: 0,
        scale: 0.985,
        transformOrigin: "70px 70px",
      })
      gsap.set(".inseek-symbol-draw", {
        drawSVG: "50% 50%",
        opacity: 0,
        transformOrigin: "70px 70px",
      })

      const introTimeline = gsap.timeline({
        defaults: { ease: "power4.out" },
      })

      introTimeline
        .fromTo(
          curtainRef.current,
          { yPercent: -100 },
          { yPercent: 0, duration: 1.25 }
        )
        .fromTo(
          ".inseek-symbol-draw",
          {
            drawSVG: "50% 50%",
            opacity: 0,
          },
          {
            drawSVG: "0% 100%",
            opacity: 1,
            duration: 1.28,
            ease: "power2.inOut",
            stagger: {
              amount: 0.48,
              from: "center",
            },
          },
          "-=0.18"
        )
        .to(
          ".inseek-symbol-fill",
          {
            opacity: 1,
            scale: 1,
            duration: 0.54,
            ease: "power1.out",
            stagger: {
              amount: 0.18,
              from: "center",
            },
          },
          ">-0.28"
        )
        .to(
          ".inseek-symbol-draw",
          {
            opacity: 0,
            duration: 0.34,
            ease: "power2.out",
          },
          "<0.14"
        )
        .fromTo(
          ".inseek-word-part",
          { yPercent: -115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.82,
            stagger: {
              amount: 0.42,
              from: "start",
            },
          },
          "-=0.36"
        )

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
        defaults: { ease: "none" },
      })

      scrollTimeline
        .addLabel("logoExit")
        .to(
          ".inseek-symbol, .inseek-symbol-draw-layer",
          {
            y: () => -window.innerHeight * 1.35,
            duration: 1.56,
          },
          "logoExit"
        )
        .to(
          ".curtain-strip",
          {
            yPercent: -105,
            duration: 1.18,
            stagger: 0.06,
          },
          "logoExit+=0.02"
        )
        .to(
          ".inseek-word-part",
          {
            y: () => -window.innerHeight * 1.35,
            duration: 1.72,
            stagger: 0.11,
          },
          "logoExit+=0.06"
        )
        .to(
          ".inseek-logo-scroll",
          {
            autoAlpha: 0,
            duration: 0.02,
          },
          "logoExit+=1.9"
        )
        .to(
          ".hero-copy-line",
          {
            yPercent: 0,
            duration: 0.58,
            ease: "power3.out",
            stagger: 0.14,
          },
          ">-0.18"
        )
        .to(
          ".section-kicker",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          "<"
        )
        .to(
          ".talk-cursor",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.2,
            onStart: () => setHeroCursorActive(true),
            onReverseComplete: () => setHeroCursorActive(false),
          },
          "<"
        )
        .to({}, { duration: 0.65 })
        .to(
          ".talk-cursor",
          {
            autoAlpha: 0,
            scale: 0.72,
            duration: 0.14,
            onStart: () => setHeroCursorActive(false),
            onReverseComplete: () => setHeroCursorActive(true),
          },
          ">-0.14"
        )
        .to(".white-screen-strip", {
          yPercent: 0,
          stagger: 0.045,
          duration: 0.82,
        })
        .to(
          ".work-kicker",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          ">-0.08"
        )
        .to(
          ".work-title-line",
          {
            yPercent: 0,
            duration: 0.58,
            ease: "power3.out",
            stagger: 0.1,
          },
          ">-0.04"
        )
        .to(
          ".work-summary",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.36,
            ease: "power2.out",
          },
          ">-0.16"
        )
      
      scrollTimeline.to(
        ".work-card-shell",
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        ">-0.04"
      )

      const workCardMarks = gsap.utils.toArray<SVGPathElement>(
        ".work-card-mark-path"
      )
      const workCards = gsap.utils.toArray<HTMLElement>(".work-card-content")

      workCards.forEach((card, index) => {
        const markPaths = workItems[index]?.markPaths

        scrollTimeline
          .to(
            card,
            {
              autoAlpha: 1,
              duration: 0.12,
            },
            index === 0 ? ">-0.04" : ">-0.12"
          )

        if (workCardMarks.length > 0 && markPaths) {
          const markTimeline = gsap.timeline()

          workCardMarks.forEach((mark, markIndex) => {
            const targetPath = markPaths[markIndex] ?? workIconSeedPath

            markTimeline.to(
              mark,
              {
                morphSVG: targetPath,
                autoAlpha: markPaths[markIndex] ? 1 : 0,
                duration: 0.48,
                ease: "power3.out",
              },
              markIndex * 0.012
            )
          })

          scrollTimeline.add(markTimeline, "<0.08")
        }

        const title = card.querySelector<HTMLElement>(".work-card-title")
        const text = card.querySelector<HTMLElement>(".work-card-text")

        scrollTimeline
          .to(
            [title, text],
            {
              autoAlpha: 1,
              y: 0,
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 0.22,
              stagger: 0.045,
              ease: "power2.out",
            },
            "<0.08"
          )
          .to({}, { duration: 0.54 })

        if (index < workCards.length - 1) {
          scrollTimeline
            .to(card, {
              autoAlpha: 0,
              duration: 0.16,
              ease: "power2.in",
            })
            .set([title, text], {
              autoAlpha: 0,
              y: 18,
              clipPath: "inset(0% 0% 100% 0%)",
            })
        }
      })

      scrollTimeline
        .to({}, { duration: 0.58 })
        .to(".process-screen", {
          yPercent: 0,
          duration: 1.16,
          ease: "power2.inOut",
        })
        .to(
          ".process-kicker",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          ">-0.1"
        )
        .to(
          ".process-title-line",
          {
            yPercent: 0,
            duration: 0.58,
            ease: "power3.out",
            stagger: 0.1,
          },
          ">-0.04"
        )
        .to(
          ".process-summary",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            ease: "power2.out",
          },
          ">-0.14"
        )
        .to(
          ".process-card",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            ease: "power3.out",
          },
          ">-0.06"
        )

      const processContents = gsap.utils.toArray<HTMLElement>(
        ".process-card-content"
      )

      processContents.forEach((content, index) => {
        const contentParts = gsap.utils.toArray<HTMLElement>(
          content.querySelectorAll(".process-card-part")
        )

        scrollTimeline
          .to(
            processContents,
            {
              y: -18,
              autoAlpha: 0,
              filter: "blur(10px)",
              duration: index === 0 ? 0.02 : 0.18,
              ease: "power2.in",
            },
            index === 0 ? "<" : ">"
          )
          .set(contentParts, { autoAlpha: 0, y: 22 })
          .to(
            content,
            {
              y: 0,
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.34,
              ease: "power3.out",
            },
            "<"
          )
          .to(
            contentParts,
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.34,
              ease: "power3.out",
              stagger: 0.08,
            },
            "<0.08"
          )
          .to({}, { duration: 0.72 })
      })

      scrollTimeline
        .to({}, { duration: 0.42 })
        .to(".catalog-screen", {
          yPercent: 0,
          duration: 0.78,
          ease: "power3.inOut",
        })
        .to(
          ".catalog-kicker",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          ">-0.1"
        )
        .to(
          ".catalog-title-line",
          {
            yPercent: 0,
            duration: 0.58,
            ease: "power3.out",
            stagger: 0.1,
          },
          ">-0.04"
        )
        .to(
          ".catalog-copy",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            ease: "power2.out",
          },
          ">-0.12"
        )
        .to(
          ".catalog-link",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: "power3.out",
            stagger: 0.08,
          },
          ">-0.06"
        )
        .to({}, { duration: 0.42 })
        .to(
          ".catalog-copy-block",
          {
            x: () => -window.innerWidth * 1.18,
            autoAlpha: 0,
            duration: 0.62,
            ease: "power3.inOut",
          },
          "catalogExit"
        )
        .to(
          ".catalog-links",
          {
            x: () => window.innerWidth * 1.18,
            autoAlpha: 0,
            duration: 0.62,
            ease: "power3.inOut",
          },
          "catalogExit"
        )
        .to(
          ".catalog-kicker",
          {
            autoAlpha: 0,
            y: -12,
            duration: 0.24,
            ease: "power2.in",
          },
          "catalogExit"
        )
        .to(".contacts-screen", {
          yPercent: 0,
          duration: 0.94,
          ease: "power3.inOut",
        })
        .to(
          ".contacts-kicker",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          ">-0.1"
        )
        .to(
          ".contacts-title-line",
          {
            yPercent: 0,
            duration: 0.62,
            ease: "power3.out",
            stagger: 0.1,
          },
          ">-0.04"
        )
        .to(
          ".contacts-copy",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.36,
            ease: "power2.out",
          },
          ">-0.12"
        )
        .to(
          ".contacts-item",
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            ease: "power3.out",
            stagger: 0.08,
          },
          ">-0.08"
        )
        .to(
          ".talk-cursor",
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.2,
            onStart: () => setHeroCursorActive(true),
            onReverseComplete: () => setHeroCursorActive(false),
          },
          "<"
        )

      window.addEventListener("resize", fitTitleToScreen)

      return () => {
        window.removeEventListener("resize", fitTitleToScreen)
        scrollTimeline.scrollTrigger?.kill()
        scrollTimeline.kill()
        introTimeline.kill()
        window.removeEventListener("mousemove", handleMouseMove)
        setHeroCursorActive(false)
      }
    },
    { scope: pageRef }
  )

  useGSAP(
    () => {
      if (!isRfqOpen) {
        return
      }

      isRfqClosingRef.current = false
      scrollBlockAbortRef.current?.abort()
      scrollBlockAbortRef.current = new AbortController()

      const modal = document.querySelector<HTMLElement>(".rfq-modal")
      const closeCursor = document.querySelector<HTMLElement>(".close-cursor")
      const closeZone = document.querySelector<HTMLElement>(".close-cursor-zone")

      const moveCursorX = closeCursor
        ? gsap.quickTo(closeCursor, "x", {
            duration: 0.24,
            ease: "power3.out",
          })
        : null
      const moveCursorY = closeCursor
        ? gsap.quickTo(closeCursor, "y", {
            duration: 0.24,
            ease: "power3.out",
          })
        : null

      const handleMouseMove = (event: MouseEvent) => {
        moveCursorX?.(event.clientX)
        moveCursorY?.(event.clientY)
      }

      const scrollKeys = new Set([
        " ",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "End",
        "Home",
        "PageDown",
        "PageUp",
      ])

      const isFormField = (target: EventTarget | null) => {
        return target instanceof Element
          ? Boolean(target.closest("input, textarea, select, [contenteditable]"))
          : false
      }

      const canScrollPanel = (panel: HTMLElement, deltaY: number) => {
        if (deltaY < 0) {
          return panel.scrollTop > 0
        }

        if (deltaY > 0) {
          return panel.scrollTop + panel.clientHeight < panel.scrollHeight
        }

        return false
      }

      const handleWheel = (event: WheelEvent) => {
        const panel = (event.target as Element | null)?.closest<HTMLElement>(
          ".rfq-modal-panel"
        )

        if (!panel || !canScrollPanel(panel, event.deltaY)) {
          event.preventDefault()
        }
      }

      const handleTouchMove = (event: TouchEvent) => {
        if (!(event.target as Element | null)?.closest(".rfq-modal-panel")) {
          event.preventDefault()
        }
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (!scrollKeys.has(event.key) || isFormField(event.target)) {
          return
        }

        event.preventDefault()
      }

      const handlePointerEnter = () => {
        if (closeZone) {
          closeZone.style.cursor = "none"
        }

        gsap.to(closeCursor, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.18,
          ease: "power3.out",
        })
      }

      const handlePointerLeave = () => {
        if (closeZone) {
          closeZone.style.cursor = ""
        }

        gsap.to(closeCursor, {
          autoAlpha: 0,
          scale: 0.72,
          duration: 0.16,
          ease: "power2.out",
        })
      }

      gsap.set(modal, { xPercent: 100 })
      gsap.set(closeCursor, {
        autoAlpha: 0,
        scale: 0.72,
        xPercent: -50,
        yPercent: -50,
      })
      gsap.to(modal, {
        xPercent: 0,
        duration: 0.82,
        ease: "power4.out",
      })

      modal?.addEventListener("mousemove", handleMouseMove)
      closeZone?.addEventListener("pointerenter", handlePointerEnter)
      closeZone?.addEventListener("pointerleave", handlePointerLeave)
      window.addEventListener("wheel", handleWheel, {
        capture: true,
        passive: false,
        signal: scrollBlockAbortRef.current.signal,
      })
      window.addEventListener("touchmove", handleTouchMove, {
        capture: true,
        passive: false,
        signal: scrollBlockAbortRef.current.signal,
      })
      window.addEventListener("keydown", handleKeyDown, {
        capture: true,
        signal: scrollBlockAbortRef.current.signal,
      })

      return () => {
        modal?.removeEventListener("mousemove", handleMouseMove)
        closeZone?.removeEventListener("pointerenter", handlePointerEnter)
        closeZone?.removeEventListener("pointerleave", handlePointerLeave)
        scrollBlockAbortRef.current?.abort()
        scrollBlockAbortRef.current = null
      }
    },
    { dependencies: [isRfqOpen] }
  )

  return (
    <main
      ref={pageRef}
      className="relative min-h-[1050vh] w-full bg-[#EAEAEA]"
    >
      <div
        ref={curtainRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
        onClick={() => {
          if (isHeroCursorActiveRef.current && !isRfqOpen) {
            setIsRfqOpen(true)
          }
        }}
      >
        <div
          className={`talk-cursor pointer-events-none fixed left-0 top-0 z-[60] flex h-32 w-32 items-center justify-center rounded-full bg-[#EAF1C1] text-lg text-[#020202] opacity-0 shadow-[0_18px_60px_rgba(2,2,2,0.18)] ${
            isRfqOpen ? "hidden" : ""
          }`}
          aria-hidden="true"
        >
          Обсудим?
        </div>

        <section
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-gradient.jpg')" }}
          aria-label="InSeek background screen"
        >
          <div className="section-kicker absolute left-6 right-6 top-8 text-white opacity-0 md:left-12 md:right-12 lg:left-16 lg:right-16">
            <div className="h-px w-full bg-white/35" />
            <div className="mt-5 flex items-center gap-3 text-sm uppercase leading-none tracking-[0.02em]">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span>Главная</span>
            </div>
          </div>

          <div className="hero-copy absolute left-6 top-1/2 max-w-[min(860px,76vw)] -translate-y-1/2 text-white md:left-12 lg:left-16">
            <p
              className="text-[clamp(2.8rem,6vw,7.5rem)] leading-[0.95]"
              aria-label="От подбора и поставки — до запуска и квалификации."
            >
              <span className="block overflow-hidden pb-2">
                <span className="hero-copy-line block will-change-transform">
                  От подбора и поставки —
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-copy-line block will-change-transform">
                  до запуска и квалификации.
                </span>
              </span>
            </p>
          </div>
        </section>

        {strips.map((_, index) => (
          <div
            key={index}
            className="curtain-strip absolute top-0 z-[1] h-full bg-[#020202] will-change-transform"
            style={{
              left: `${index * 20}%`,
              width: "calc(20% + 2px)",
            }}
          />
        ))}

        {strips.map((_, index) => (
          <div
            key={`white-${index}`}
            className="white-screen-strip absolute top-0 z-[11] h-full bg-[#EAEAEA] will-change-transform"
            style={{
              left: `${index * 20}%`,
              width: "calc(20% + 2px)",
            }}
          />
        ))}

        <div className="work-kicker absolute left-6 right-6 top-8 z-[12] text-[#020202] opacity-0 md:left-12 md:right-12 lg:left-16 lg:right-16">
          <div className="h-px w-full bg-[#020202]/20" />
          <div className="mt-5 flex items-center gap-3 text-sm uppercase leading-none tracking-[0.02em]">
            <span className="h-2 w-2 rounded-full bg-[#020202]" />
            <span>Что мы делаем?</span>
          </div>
        </div>

        <section className="absolute inset-x-6 top-[15vh] z-[12] grid gap-8 text-[#060C1A] md:inset-x-12 lg:inset-x-16 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)] lg:items-start">
          <div className="max-w-[980px]">
            <h2
              className="text-[clamp(3rem,5.2vw,6.6rem)] leading-[0.96]"
              aria-label="Комплексное сопровождение проектов"
            >
              <span className="block overflow-hidden pb-2">
                <span className="work-title-line block will-change-transform">
                  Комплексное
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="work-title-line block will-change-transform">
                  сопровождение
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="work-title-line block will-change-transform">
                  проектов
                </span>
              </span>
            </h2>

            <p className="work-summary mt-8 max-w-[820px] text-[clamp(1.15rem,1.45vw,1.9rem)] leading-[1.45] text-[#3E5467] opacity-0">
              Реализуем проекты полного цикла для лабораторий, производств и
              исследовательских центров: аналитическое, технологическое и
              контрольное оборудование с инжиниринговой адаптацией под задачи
              заказчика.
            </p>
          </div>

          <article className="work-card-shell relative h-[clamp(360px,52vh,560px)] rounded-[8px] border border-[#3E5467]/30 bg-[#EAEAEA]/90 p-7 opacity-0 md:p-9 lg:mt-4">
            <svg
              className="absolute left-7 top-7 h-24 w-24 text-[#89956B] md:left-9 md:top-9"
              viewBox="0 0 512 512"
              aria-hidden="true"
            >
              {Array.from({ length: workIconLayerCount }).map((_, index) => (
                <path
                  key={index}
                  className="work-card-mark-path"
                  d={workIconSeedPath}
                  fill="currentColor"
                />
              ))}
            </svg>

            {workItems.map((item) => (
              <div
                key={item.title}
                className="work-card-content absolute inset-x-7 bottom-7 top-7 opacity-0 md:inset-x-9 md:bottom-9 md:top-9"
              >
                <h3
                  className="work-card-title flex min-h-24 items-center pl-32 text-[clamp(1.55rem,1.65vw,2.25rem)] leading-[1.12] text-[#060C1A]"
                  data-text={item.title}
                  aria-label={item.title}
                >
                  {item.title}
                </h3>
                <p
                  className="work-card-text mt-8 text-[clamp(1.05rem,1.1vw,1.35rem)] leading-[1.55] text-[#3E5467]"
                  data-text={item.text}
                  aria-label={item.text}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </article>
        </section>

        <div
          ref={titleRef}
          className="absolute inset-0 z-10 mx-auto flex w-max origin-center items-center justify-center overflow-visible"
          aria-label="InSeek"
        >
          <span
            className="inseek-logo-scroll inline-block will-change-transform"
            aria-hidden="true"
          >
            <svg
              className="inseek-logo h-auto max-h-[58vh] w-[calc(100vw-48px)] max-w-none overflow-visible"
              viewBox="0 0 566 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <g className="inseek-symbol">
                {logoSymbolPaths.map((path, index) => (
                  <path
                    key={`symbol-${index}`}
                    className="inseek-symbol-fill will-change-transform"
                    d={path}
                    fill="white"
                  />
                ))}
              </g>
              <g className="inseek-symbol-draw-layer">
                {logoSymbolPaths.map((path, index) => (
                  <path
                    key={`symbol-draw-${index}`}
                    className="inseek-symbol-draw will-change-transform"
                    d={path}
                    fill="none"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </g>
              <g className="inseek-wordmark">
                {logoWordPaths.map((path, index) => (
                  <path
                    key={`word-${index}`}
                    className="inseek-word-part will-change-transform"
                    d={path}
                    fill="white"
                  />
                ))}
              </g>
            </svg>
          </span>
        </div>

        <section className="process-screen absolute inset-0 z-[13] bg-[#EAEAEA] px-6 py-8 text-[#060C1A] will-change-transform md:px-12 lg:px-16">
          <div className="process-kicker opacity-0">
            <div className="h-px w-full bg-[#020202]/20" />
            <div className="mt-5 flex items-center gap-3 text-sm uppercase leading-none tracking-[0.02em] text-[#020202]">
              <span className="h-2 w-2 rounded-full bg-[#020202]" />
              <span>Как мы делаем</span>
            </div>
          </div>

          <div className="mt-[8vh] grid gap-10 lg:grid-cols-[0.82fr_1fr] lg:items-start">
            <div className="catalog-copy-block will-change-transform">
              <h2
                className="text-[clamp(4.5rem,9vw,11rem)] leading-[0.9] text-[#020202]"
                aria-label="Полный цикл"
              >
                <span className="block overflow-hidden pb-2">
                  <span className="process-title-line block will-change-transform">
                    Полный
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span className="process-title-line block will-change-transform">
                    цикл
                  </span>
                </span>
              </h2>
              <p className="process-summary mt-8 max-w-[560px] text-[clamp(1.1rem,1.25vw,1.45rem)] leading-[1.5] text-[#3E5467] opacity-0">
                Ведем проект как единую последовательность: от первой
                технической задачи до методик, обучения и поддержки после
                запуска.
              </p>
            </div>

            <div className="lg:pt-4">
              <article className="process-card relative min-h-[360px] overflow-hidden rounded-[8px] border border-[#3E5467]/30 bg-[#EAEAEA] p-8 opacity-0 md:p-10">
                {processItems.map((item) => (
                  <div
                    key={item.title}
                    className="process-card-content absolute inset-8 opacity-0 md:inset-10"
                  >
                    <p className="process-card-part text-sm uppercase leading-none tracking-[0.18em] text-[#3E5467]">
                      {item.eyebrow}
                    </p>
                    <h3 className="process-card-part mt-10 text-[clamp(2.1rem,3vw,4.4rem)] leading-[1.02] text-[#060C1A]">
                      {item.title}
                    </h3>
                    <p className="process-card-part mt-8 max-w-[760px] text-[clamp(1.15rem,1.35vw,1.7rem)] leading-[1.48] text-[#3E5467]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </article>
            </div>
          </div>
        </section>

        <section
          id="catalog"
          className="catalog-screen absolute inset-0 z-[14] bg-[#EAEAEA] px-6 py-8 text-[#060C1A] will-change-transform md:px-12 lg:px-16"
        >
          <div className="catalog-kicker opacity-0">
            <div className="h-px w-full bg-[#020202]/20" />
            <div className="mt-5 flex items-center gap-3 text-sm uppercase leading-none tracking-[0.02em] text-[#020202]">
              <span className="h-2 w-2 rounded-full bg-[#020202]" />
              <span>Каталог решений</span>
            </div>
          </div>

          <div className="mt-[8vh] grid min-h-[66vh] gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div className="catalog-copy-block will-change-transform">
              <h2
                className="text-[clamp(4.8rem,10vw,12rem)] leading-[0.86] text-[#020202]"
                aria-label="Каталог"
              >
                <span className="block overflow-hidden pb-2">
                  <span className="catalog-title-line block will-change-transform">
                    Каталог
                  </span>
                </span>
              </h2>
              <p className="catalog-copy mt-8 max-w-[620px] text-[clamp(1.1rem,1.3vw,1.55rem)] leading-[1.5] text-[#3E5467] opacity-0">
                Основные направления, с которых можно начать подбор: приборы,
                запасные части и расходные материалы для лабораторий и
                производств.
              </p>
            </div>

            <div className="catalog-links grid gap-4 will-change-transform lg:pt-4">
              {siteConfig.categoryPreview.map((category) => (
                <Link
                  key={category.slug}
                  href={`/catalog/${category.slug}`}
                  className="catalog-link group flex min-h-28 items-center justify-between gap-6 rounded-[8px] border border-[#3E5467]/30 bg-[#EAEAEA] px-6 py-5 text-[#060C1A] opacity-0 transition-colors duration-300 hover:border-[#060C1A] hover:bg-[#060C1A] hover:text-[#EAEAEA] md:px-8"
                >
                  <span>
                    <span className="block text-[clamp(1.7rem,2.2vw,3.1rem)] leading-none">
                      {category.title}
                    </span>
                    <span className="mt-3 block max-w-[620px] text-base leading-[1.45] text-[#3E5467] transition-colors duration-300 group-hover:text-[#EAEAEA]/75">
                      {category.description}
                    </span>
                  </span>
                  <span className="shrink-0 text-4xl leading-none">→</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contacts"
          className="contacts-screen absolute inset-0 z-[15] bg-[#020202] bg-cover bg-center bg-no-repeat px-6 py-8 text-white will-change-transform md:px-12 lg:px-16"
          style={{ backgroundImage: "url('/ERM_007.jpg.webp')" }}
          aria-label="Контакты InSeek"
        >
          <div className="absolute inset-0 bg-[#020202]/55" />
          <div className="relative z-10 flex min-h-full flex-col">
            <div className="contacts-kicker opacity-0">
              <div className="h-px w-full bg-white/35" />
              <div className="mt-5 flex items-center gap-3 text-sm uppercase leading-none tracking-[0.02em] text-white">
                <span className="h-2 w-2 rounded-full bg-white" />
                <span>Контакты</span>
              </div>
            </div>

            <div className="mt-[8vh] grid flex-1 gap-10 lg:grid-cols-[0.9fr_1fr] lg:items-start">
              <div>
                <h2
                  className="text-[clamp(4.4rem,9vw,11rem)] leading-[0.9] text-[#EAEAEA]"
                  aria-label="Связаться"
                >
                  <span className="block overflow-hidden pb-2">
                    <span className="contacts-title-line block will-change-transform">
                      Связаться
                    </span>
                  </span>
                </h2>
                <p className="contacts-copy mt-8 max-w-[720px] text-[clamp(1.15rem,1.45vw,1.9rem)] leading-[1.45] text-white/82 opacity-0">
                  Расскажите, что нужно подобрать или запустить. Мы вернемся с
                  уточнениями, конфигурацией и следующим шагом по проекту.
                </p>
              </div>

              <div className="grid gap-4 lg:pt-4">
                <div className="contacts-item rounded-[8px] border border-white/30 bg-white/8 px-6 py-5 opacity-0 backdrop-blur-sm md:px-8">
                  <span className="block text-sm uppercase tracking-[0.16em] text-white/62">
                    Email
                  </span>
                  <span className="mt-3 block text-[clamp(1.6rem,2.2vw,3rem)] leading-none">
                    {siteConfig.company.email}
                  </span>
                </div>
                <div className="contacts-item rounded-[8px] border border-white/30 bg-white/8 px-6 py-5 opacity-0 backdrop-blur-sm md:px-8">
                  <span className="block text-sm uppercase tracking-[0.16em] text-white/62">
                    Телефон
                  </span>
                  <span className="mt-3 block text-[clamp(1.6rem,2.2vw,3rem)] leading-none">
                    {siteConfig.company.phone}
                  </span>
                </div>
                <div className="contacts-item rounded-[8px] border border-white/30 bg-white/8 px-6 py-5 opacity-0 backdrop-blur-sm md:px-8">
                  <span className="block text-sm uppercase tracking-[0.16em] text-white/62">
                    Адрес
                  </span>
                  <span className="mt-3 block text-[clamp(1.6rem,2.2vw,3rem)] leading-none">
                    {siteConfig.company.address}
                  </span>
                </div>
              </div>
            </div>

            <div className="contacts-item relative z-10 mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/25 pt-5 text-sm uppercase tracking-[0.14em] text-white/68 opacity-0">
              <Image
                src="/InSeek_Logo_White.svg"
                alt="InSeek"
                width={180}
                height={45}
                className="h-8 w-auto opacity-70"
              />
              <span>{new Date().getFullYear()}</span>
            </div>
          </div>
        </section>
      </div>

      {isRfqOpen ? (
        <div
          className="rfq-modal fixed inset-0 z-[80] grid overscroll-contain bg-[#EAEAEA] text-[#020202] lg:grid-cols-[0.95fr_1fr]"
          role="dialog"
          aria-modal="true"
          aria-label="Форма обсуждения проекта"
          onWheel={(event) => {
            if (!event.currentTarget.contains(event.target as Node)) {
              return
            }

            if (!(event.target as Element).closest(".rfq-modal-panel")) {
              event.preventDefault()
            }
          }}
          onTouchMove={(event) => {
            if (!(event.target as Element).closest(".rfq-modal-panel")) {
              event.preventDefault()
            }
          }}
        >
          <button
            type="button"
            className="absolute right-6 top-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#020202]/10 text-4xl leading-none text-[#020202] transition hover:bg-[#020202]/15"
            onClick={closeRfqModal}
            aria-label="Закрыть форму"
          >
            ×
          </button>

          <div
            className="close-cursor-zone relative hidden overflow-hidden bg-[#EAEAEA] lg:block"
            onClick={closeRfqModal}
          >
            <div
              className="close-cursor pointer-events-none fixed left-0 top-0 z-[90] flex h-32 w-32 items-center justify-center rounded-full bg-[#EAF1C1] text-lg text-[#020202] opacity-0 shadow-[0_18px_60px_rgba(2,2,2,0.18)]"
              aria-hidden="true"
            >
              Закрыть
            </div>

            <svg
              className="absolute left-[-10%] top-[20%] h-[62vh] w-[72%] text-[#060C1A] opacity-[0.07]"
              viewBox="0 0 140 140"
              aria-hidden="true"
            >
              <g transform="translate(70 70) scale(1.92) translate(-70 -70)">
                {logoSymbolPaths.map((path, index) => (
                  <path key={`rfq-symbol-${index}`} d={path} fill="currentColor" />
                ))}
              </g>
            </svg>
            <svg
              className="absolute bottom-[8%] right-[8%] h-[34vh] w-[38%] text-[#89956B] opacity-[0.09]"
              viewBox="0 0 140 140"
              aria-hidden="true"
            >
              <g transform="translate(70 70) scale(1.18) rotate(28) translate(-70 -70)">
                {logoSymbolPaths.map((path, index) => (
                  <path key={`rfq-symbol-small-${index}`} d={path} fill="currentColor" />
                ))}
              </g>
            </svg>
            <div className="absolute inset-y-[18%] left-[16%] w-px bg-[#060C1A]/10" />
            <div className="absolute bottom-[22%] left-[12%] right-[18%] h-px bg-[#060C1A]/10" />
          </div>

          <div className="rfq-modal-panel overflow-y-auto overscroll-contain px-6 py-8 md:px-10 lg:px-14 lg:py-10">
            <div className="mx-auto max-w-[760px]">
              <h2 className="text-[clamp(4rem,7vw,8rem)] leading-[0.9] text-[#020202]">
                Обсудим проект?
              </h2>
              <div className="mt-8 rounded-[8px] border border-[#3E5467]/25 bg-[#EAEAEA] p-5 md:p-6">
                <RfqForm mode="general" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}

/*
import { Link } from "next-view-transitions"
import { motion } from "motion/react"

import Hero from "@/components/hero/Hero"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"
import RfqForm from "@/components/rfq/RfqForm"
import Section from "@/components/ui/Section"
import { siteConfig } from "@/content/site"
import CatalogFlowSection from "@/components/home/CatalogFlowSection"

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <div className="xl:hidden">
          <Section className="pt-0">
            <motion.div
              className="mb-8 flex items-end justify-between gap-6"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                  Каталог
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  Основные направления
                </h2>
              </div>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              {siteConfig.categoryPreview.map((category, index) => (
                <motion.div
                  key={category.slug}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.42,
                    delay: index * 0.07,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={`/catalog/${category.slug}`}
                    className="surface-card surface-card-hover block p-7"
                  >
                    <h3 className="text-2xl font-semibold tracking-[-0.02em]">
                      {category.title}
                    </h3>

                    <p className="mt-4 text-sm leading-6 muted-text">
                      {category.description}
                    </p>

                    <div className="mt-8 flex items-center justify-between">
                      <span className="text-sm font-medium text-[var(--primary)]">
                        Перейти в каталог
                      </span>
                      <span className="text-lg text-[var(--primary)]">→</span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Section>

          <Section className="pt-0">
            <motion.div
              className="section-panel px-8 py-8 md:px-10 md:py-10"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.48, ease: "easeOut" }}
            >
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                  Почему с нами удобно
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  Структурированный каталог и единый запрос на КП
                </h2>
              </div>

              <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {siteConfig.benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    className="surface-card p-6"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                      ease: "easeOut",
                    }}
                  >
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 muted-text">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Section>
        </div>

        <div className="hidden xl:block">
          <CatalogFlowSection />
        </div>

        <Section id="rfq" className="pt-0">
          <motion.div
            className="section-panel px-8 py-8 md:px-10 md:py-10"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.48, ease: "easeOut" }}
          >
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="max-w-2xl">
                <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
                  Обратная связь
                </p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
                  Оставьте запрос без выбора позиции в каталоге
                </h2>
                <p className="mt-4 text-base leading-7 muted-text">
                  Напишите, какое оборудование, запчасть или расходные
                  материалы нужно подобрать. Мы уточним задачу и подготовим
                  коммерческое предложение.
                </p>

                <Link
                  href="/catalog/instruments"
                  className="ui-button ui-button-secondary mt-6"
                >
                  Перейти в каталог
                </Link>
              </div>

              <div className="surface-card p-5 md:p-6">
                <RfqForm mode="general" />
              </div>
            </div>
          </motion.div>
        </Section>
      </main>

      <Footer />
    </>
  )
}
*/
