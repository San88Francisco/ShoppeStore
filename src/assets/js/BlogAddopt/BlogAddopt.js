const clearAllInput = () => {
   const replyInput = document.querySelectorAll('.replyInput');
   replyInput.forEach(item => {
       item.addEventListener('input', () => {
           const inputValue = item.value.trim(); 
           if (inputValue.length > 0) {
               const thisDelText = item.parentElement.children[2].children[0]
               thisDelText.style.opacity = '1';
               item.parentElement.children[1].style.display = 'none'
               thisDelText.addEventListener('click', ()=>{
                  item.value = ''
                  item.parentElement.children[2].children[0].style.opacity = '0';
               })
            } else {
               item.parentElement.children[2].children[0].style.opacity = '0';
           }
       });
   });
}


const commentsStatic = [
   {
      userName: 'Scarlet withch',
      userDate: '6 May, 2020',
      userContent: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. ',
      usersAnswers: [
         {
            userName: 'Scarlet withch',
            userDate: '6 May, 2020',
            userContent: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. ',
         },
      ]
   },
   {
      userName: 'Scarlet withch',
      userDate: '6 May, 2020',
      userContent: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet. ',
      usersAnswers:[],
   },
]

const pagePostContents = [
   {
      postAughtor: 'ANNY JOHNSON',
      postDate: 'October 8,2020',
      postName: 'Fast Fashion, And Faster Fashion',
      postImg: './assets/img/BlogAddopt_img/main.png',
   },
   {
      postAughtor: 'LILY MILLER',
      postDate: 'January 15, 2023',
      postName: 'Fast Lane Fashion for Trendsetters',
      postImg: './assets/img/BlogAddopt_img/02blog_card.png',
   },   
   {
      postAughtor: 'EMMA MARTIN',
      postDate: 'March 22, 2021',
      postName: 'Where Style Meets Speed',
      postImg: './assets/img/BlogAddopt_img/03blog_card.png',
   },   
   {
      postAughtor: 'OLIVIA WILLIAMS',
      postDate: 'May 5, 2022',
      postName: 'Tailored for the Modern Maverick',
      postImg: './assets/img/BlogAddopt_img/04blog_card.png',
   },   
   {
      postAughtor: 'SOPHIE DAVIS',
      postDate: 'August 10, 2024',
      postName: 'Elevate Your Wardrobe Rapidly',
      postImg: './assets/img/BlogAddopt_img/03blog_card.png',
   },   
   {
      postAughtor: 'GRACE BROWN',
      postDate: 'September 18, 2021',
      postName: 'Unleashing Fashion Momentum',
      postImg: './assets/img/BlogAddopt_img/04blog_card.png',
   },   
   {
      postAughtor: 'ELLA WHITE',
      postDate: 'November 2, 2023',
      postName: 'Dive into the World of Faster Trends',
      postImg: './assets/img/BlogAddopt_img/main.png',
   },   
   {
      postAughtor: 'AVERY THOMPSON',
      postDate: 'December 7, 2020',
      postName: 'Your Fast Fashion Destination',
      postImg: './assets/img/BlogAddopt_img/02blog_card.png',
   },
]



const moveToReplay = () => {
   const userLink = document.querySelectorAll('.userLink')
   userLink.forEach(item => {
      item.addEventListener('click', ()=> {
         const hrefToUser = item.getAttribute('href')
         const userElement = document.getElementsByName(`${hrefToUser}`)[0]
         userElement.scrollIntoView();
         window.scrollBy(0, -(screen.height / 100 * 40));
         userElement.parentElement.children[0].style.backgroundColor = 'rgb(216, 216, 216)'
         setTimeout(function() {
            userElement.parentElement.children[0].style.background = 'none'
          }, 1000);
      })
   })
}


const getComments = () => {
   const getLocalPostId = localStorage.getItem('selectedPostNow') !== null ? localStorage.getItem('selectedPostNow') : 1
   const localComment = localStorage.getItem(`PostOfPage${getLocalPostId}`)
   if(localComment !== null){
      return JSON.parse(localComment)
   }else {
      return commentsStatic
   }
}

const autoComplite = () => {
   const userName = document.getElementsByName('userName')[0]
   const userMail = document.getElementsByName('userEmail')[0]
   const userIsSignIn = localStorage.getItem('userSignIn')
   const parseSignInDate = userIsSignIn !== null ? userIsSignIn : null
   if(parseSignInDate !== null){
      const userData = JSON.parse(localStorage.getItem(parseSignInDate))
      userName.value = `${userData.nameInput} ${userData.lastNameInput}`
      userMail.value = userData.emailInput
      const a = document.querySelectorAll('#userNotSign')
      a.forEach(item => item.style.display = 'none')
   }else {
      const Date = localStorage.getItem('replyAutoComplite')
      const ParseDate = Date !== null ? JSON.parse(Date) : null
      if(ParseDate !== null){
         userName.value = ParseDate.userName
         userMail.value = ParseDate.userMail
      }
   }
}

let replyIdNow = undefined
let selectUser
const replyBtnClick = ()=> {
   const replyBtn = document.querySelectorAll('.replyToComment')
   replyBtn.forEach(item => {
      item.addEventListener('click',()=>{
         selectUser = item
         if(item.style.marginRight !== '-20px'){
            replyBtn.forEach(item => {
               item.style.marginRight = '0px'
               item.style.fontSize = '13px'
            })
            item.style.marginRight = '-20px'
            item.style.fontSize = '16px'
            return replyIdNow = item.id
         }else{
            item.style.marginRight = '0px'
            item.style.fontSize = '13px'
            return replyIdNow = undefined
         }
      })
   })
}

const comentsNow = getComments()

const addComment = (replyId) =>{
   const submitBtn = document.querySelector('#addReply')
   submitBtn.addEventListener('click', ()=> {

      const userName = document.getElementsByName('userName')[0]
      const userMail = document.getElementsByName('userEmail')[0]
      const userWebsite = document.getElementsByName('userWebsite')[0].value
      const userContent = document.getElementsByName('userContent')[0]

      const d = new Date();
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const month = months[d.getMonth()];
      const day = d.getDate();
      const year = d.getFullYear();
      const nowDate = day + " " + month + ", " + year

      

      if(userName.value.length < 1 || userMail.value.length < 1 || userContent.value.length < 1){
         if(userName.value.length < 1) userName.parentElement.children[1].style.display = 'block'
         if(userMail.value.length < 1) userMail.parentElement.children[1].style.display = 'block'
         if(userContent.value.length < 1) userContent.parentElement.children[1].style.display = 'block'
         return
      }
      const replyCheckbox = document.querySelector('.replyCheckbox')
      if(replyCheckbox.checked === true){
         localStorage.setItem('replyAutoComplite', JSON.stringify({userName: userName.value, userMail: userMail.value,}))
      }

      if(replyIdNow !== undefined){
         let isSecondUser = selectUser.getAttribute('name').split('#')[1] % 1 === 0 ? '' : `<a class='userLink' href='${selectUser.getAttribute('name')}'>@${selectUser.parentElement.children[0].textContent}</a>    `
         comentsNow[+replyIdNow -1].usersAnswers.push({
            isUser: true,
            userName: userName.value,
            userDate: nowDate,
            userContent: `${isSecondUser}${userContent.value}`,
         })
      }else {
         comentsNow.unshift({
            isUser: true,
            userName: userName.value,
            userDate: nowDate,
            userContent: userContent.value,
            usersAnswers:[],
         })
      }

      const getLocalPostId = localStorage.getItem('selectedPostNow') !== null ? localStorage.getItem('selectedPostNow') : 1
      localStorage.setItem(`PostOfPage${getLocalPostId}`,JSON.stringify(comentsNow))
      drawComments(getComments())
      replyIdNow = undefined
      replyBtnClick()
      moveToReplay()
   })
}



const drawComments = (comments) => {
   const comentsBlock = document.querySelector('.coments-block');
   comentsBlock.textContent =''

   const addoptComments = document.querySelector('#addoptComments');
   const mainTample = document.querySelector('#mainComments');

   const commentsCount = document.querySelector('.nuberOfComents')
   let nuberOfComents = 0
   for(i = 0; i <= comments.length - 1; i++){
      nuberOfComents++
      let blockCount = i + 1

      const clone = document.importNode(mainTample.content, true);

      const userImg = clone.querySelector('.userImg')
      comments[i].isUser ? userImg.setAttribute('src', './assets/img/BlogAddopt_img/userImg.png') : 0

      const userName = clone.querySelector('.userName')
      userName.textContent = comments[i].userName

      const userDate = clone.querySelector('.userDate')
      userDate.textContent = comments[i].userDate

      const userContent = clone.querySelector('.userContent')
      userContent.textContent = comments[i].userContent

      const thisHr = clone.querySelector('hr')
      comments.length - 1 === i ? thisHr.style.display = 'none' : 0

      const replyBtn = clone.querySelector('.replyToComment')
      replyBtn.setAttribute('id', i + 1)
      replyBtn.setAttribute('name', `#${i + 1}`)
      if (comments[i].usersAnswers !== undefined) {
         const usersAnswers = clone.querySelector('.usersAnswers')

         for (r = 0; r <= comments[i].usersAnswers.length - 1; r++) {
            nuberOfComents++
            const answerClone = document.importNode(addoptComments.content, true);

            const userImg = answerClone.querySelector('.userImg')
            comments[i].usersAnswers[r].isUser ? userImg.setAttribute('src', './assets/img/BlogAddopt_img/userImg.png') : 0

            const answerUserName = answerClone.querySelector('.userName')
            answerUserName.textContent = comments[i].usersAnswers[r].userName

            const answerUserDate = answerClone.querySelector('.userDate')
            answerUserDate.textContent = comments[i].usersAnswers[r].userDate

            const answerUserContent = answerClone.querySelector('.userContent')
            answerUserContent.innerHTML = comments[i].usersAnswers[r].userContent

            const replyBtn = answerClone.querySelector('.replyToComment')
            replyBtn.setAttribute('id', i + 1)
            replyBtn.setAttribute('name', `#${blockCount}.${r + 1}`)

            usersAnswers.appendChild(answerClone);
         }
      }

      if(comentsBlock.children.length === 0){
         comentsBlock.appendChild(clone);
      }else {
         comentsBlock.children[0].appendChild(clone);
      }
   }
   commentsCount.textContent = nuberOfComents
}

const generatePage = () => {
   const getLocalPostId = localStorage.getItem('selectedPostNow') !== null ? localStorage.getItem('selectedPostNow') : 1
   
   const blogImage = document.querySelector('#blogImage')
   blogImage.setAttribute('src', pagePostContents[getLocalPostId -1].postImg)

   const blogName = document.querySelector('#blogName')
   blogName.textContent = pagePostContents[getLocalPostId -1].postName

   const blogDate = document.querySelector('#blogDate')
   blogDate.textContent = pagePostContents[getLocalPostId -1].postDate

   const blogAuthor = document.querySelector('.blog__author')
   blogAuthor.textContent = pagePostContents[getLocalPostId -1].postAughtor
}

const navigationBarLogical = () => {
   const categoriesItem = document.querySelectorAll('#categoriesBtns')
   categoriesItem.forEach(item =>{
      item.addEventListener('click',()=>{     
         localStorage.setItem('nowSelectCategories', item.textContent)
      })
   })
}


document.addEventListener('DOMContentLoaded', () => {
   if (window.location.pathname.includes('/blog-addopt')) {
      navigationBarLogical()
      generatePage()
      clearAllInput()
      drawComments(getComments())
      autoComplite()
      replyBtnClick()
      moveToReplay()
      addComment()
   }
})
