const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const priceBox = document.querySelector('.price-box');
const change = document.querySelector('.change');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
     var city = document.querySelector('.search-box input').value;
     if (city == '')
        return;
     city=city.toLowerCase();
     var lent=0;
     var rslt;
     fetch('https://raw.githubusercontent.com/Fuelish/FuelishWeb/main/Data.csv')
     .then(response => response.text())
     .then(data => {
       const rows = data.split('\r\n');
       const headers = rows[0].split(',');
       const result = [];
       lent=rows.length;
       for (let i = 1; i < rows.length; i++) {
         const row = rows[i].split(',');
         if (row.length === headers.length) {
           const obj = {};
           for (let j = 0; j < headers.length; j++) {
             obj[headers[j]] = row[j];
           }
           result.push(obj);
         }
       }
       rslt=result;
     console.log(rslt);
     var found=0;
       for(i=1;i<lent-2;i++)
          { 
               if(rslt[i]["State"].toLowerCase()==city)
               {
                    error404.style.display='none';
                    console.log(rslt[i]);
                    console.log(document.getElementById("pp"));
                    const ele1=document.getElementById("pp");
                    ele1.innerText=rslt[i]["Price(P)"];
                    const ele2=document.getElementById("dp");
                    ele2.innerText=rslt[i]["Price(D)"];
                    const ele3=document.getElementById("cp");
                    ele3.innerText=rslt[i]["Change(P)"];
                    const ele4=document.getElementById("cd");
                    ele4.innerText=rslt[i]["Change(D)"];
                    found=1;
                    break;
               }
          }
     if(found==0)
     {
          console.log(error404);
          container.style.height='400px'
          change.style.display='none';
          priceBox.style.display='none';
          error404.style.display='block';
          error404.classList.add('fadein');
          return;
     }
       //console.log(result); // do something with the parsed data
     })
     .catch(error => console.error(error));
        // FileReader Object   

            priceBox.style.display = '';
            change.style.display = '';
            priceBox.classList.add('fadeIn');
            change.classList.add('fadeIn');
            container.style.height = '590px';

        });