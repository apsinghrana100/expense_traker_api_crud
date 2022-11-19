form=document.getElementById('formid');
submit=document.getElementById('id3');
 const ul=document.getElementById('tblid');
submit.addEventListener('click',adddata);


var user_id;
function adddata(e){
    
    e.preventDefault();
    naam=document.getElementById('id1').value;
    email=document.getElementById('id2').value;
    price=document.getElementById('id4').value;
    choice=document.getElementById('1').value;
    
    
    if(naam!==''||email!=='' || price!=='')
    {

   
        const myobj={
             'naam':naam,
            'email':email,
            'price': price,
            'choice':choice
        }
        if(submit.innerText==="Update")
         {
            axios.put(`https://crudcrud.com/api/63dbe340c3ee447fba9586eba850963c/expense_tracker/${user_id}`,myobj)
            .then((respone)=>{
                console.log(respone);
                removeItemFromScreen(user_id);
               
             }).catch((err)=>{
                console.log(err);
             });

             submit.innerText="Submit";
             submit.style.background="gray"


         }
         else
         {
            axios.post("https://crudcrud.com/api/63dbe340c3ee447fba9586eba850963c/expense_tracker",myobj)
            .then((respone)=>{
                console.log(respone);
            }).catch((err)=>{
                    console.log(err);
            });
         }
        
        addNewLineElement(myobj);
        cleardataInputBox();
    
    }
    
}

 window.addEventListener('DOMContentLoaded', (event) => {
        axios.get("https://crudcrud.com/api/63dbe340c3ee447fba9586eba850963c/expense_tracker")
        .then((res)=>{
            for(var i=0;i<res.data.length;i++)
            { 
                addNewLineElement(res.data[i])
            }
        }).catch((err)=>{
            console.log(err);
        })
    })

function addNewLineElement(obj){
    let li=`<li id=${obj._id}> ${obj.naam} - ${obj.email}-${obj.price}-${obj.choice}
    <button onclick=deleteUser('${obj._id}')> Delete User </button>
    <button onclick=editUserDetails('${obj._id}','${obj.email}','${obj.naam}','${obj.price}','${obj.choice}')>Edit User </button>
 </li>`
    
    ul.innerHTML=ul.innerHTML+li;

}

function deleteUser(id) {

        axios.delete(`https://crudcrud.com/api/63dbe340c3ee447fba9586eba850963c/expense_tracker/${id}`)
        .then((response)=>{
            console.log('data deleted');
        }).catch((err)=>{
            console.log(err);
        })
        removeItemFromScreen(id);
    }
    
    function removeItemFromScreen(id){
        const parentNode = document.getElementById('tblid');
        const elem = document.getElementById(id)
        parentNode.removeChild(elem);
    }
    
    
    function editUserDetails(id,emailId, name,price,choice){
    
        document.getElementById('id2').value = emailId;
        document.getElementById('id1').value = name;
        document.getElementById('id4').value = price;
        document.getElementById('1').value = choice;
        user_id=id;
        
        submit.innerText="Update";
        submit.style.background="green";

     }

     function cleardataInputBox()
     {
        document.getElementById('id2').value ="";
        document.getElementById('id1').value ="";
        document.getElementById('id4').value ="";
     }
