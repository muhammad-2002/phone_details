const loadAllData =async(inputValue =13, isshowAll)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
    const data = await res.json()
    const phone = data.data
    displayPhones(phone,isshowAll)
    
    
}

const displayPhones=(phone,isshowAll)=>{
  console.log(phone)
    const phoneContainer =document.getElementById('phone-container')
    phoneContainer.textContent =''
    if(phone.length<=0){
      document.getElementById('not-exist').classList.remove('hidden')
    }else{
      document.getElementById('not-exist').classList.add('hidden')
    }
    if(phone.length>12 && !isshowAll){
      document.getElementById('see-more').classList.remove('hidden')
    }else{
      document.getElementById('see-more').classList.add('hidden')

        
    }
    
    if(!isshowAll){
        phone = phone.slice(0,12)
        
    }
    
    phone.forEach(element => {
        const phoneCard = document.createElement('div')
        phoneCard.classList = 'card w-96 bg-base-100 shadow-xl'
        phoneCard.innerHTML =`<figure class="px-10 pt-10">
        <img
          src="${element.image}"
          alt="Shoes"
          class="rounded-xl"
        />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${element.phone_name}</h2>
        <p>There are many variations of passages of
         available, but the majority have suffered</p>
         <P class='text-center text-3xl font-bold '>$999</P>
        <div class="card-actions">
          <button onclick="showDetails('${element.slug}')" class="btn btn-primary">Show Details</button>
        </div>
      </div>
        `
        phoneContainer.appendChild(phoneCard)
        
    });
    loding(false)
    
    

}


function searchPhone (isshowAll){
  loding(true)
   
    const inputValue = document.getElementById('search-phone').value
    
    loadAllData(inputValue,isshowAll)
    
}

//show All card in UI

function ShowAll(){
    searchPhone(true)


}
const loding =(isLoding)=>{
  
    if(isLoding){
      document.getElementById('loading-spinners').classList.remove('hidden')
    }else{
      document.getElementById('loading-spinners').classList.add('hidden')
    }


}

const showDetails=async(id)=>{
  
  //load data
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  showPhoneDetalish(data.data)
}

const showPhoneDetalish =(phone)=>{
  console.log(phone)
  my_modal_3.showModal()
  const showDetails= document.getElementById('show-details-container')

  showDetails.innerHTML = `
  <div class='flex justify-center items-center'>
  <img  src ='${phone.image}'/>
  </div>
  <div class=' w-full space-y-4'>
  <h1 class='text-4xl font-bold  '>${phone.name}</h1>
  <p class='text-base  '>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
  <h1 class='text-base   '> Bluetooth :${phone.others.Bluetooth}</h1>
  <h1 class='text-base   '> Memory :${phone.mainFeatures.memory}</h1>
  <h1 class='text-base   '>Storage :${phone.mainFeatures.storage}</h1>
  <h1 class='text-base   '> Gps :${phone.others?.GPS}</h1>
  <h1 class='text-base   '> Barand :${phone.brand}</h1>
  
  </div>`
 
}


loadAllData()