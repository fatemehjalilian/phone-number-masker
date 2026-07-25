const mask = document.getElementById('Mask');
const output = document.getElementById('Output');
const input = document.getElementById('Input');
const clear = document.getElementById('Clear');
const copy = document.getElementById('Copy');
const status = document.getElementById('status');

function normalizeDigits(text){
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return text.toString().split('').map((char) => {
        const index = persianDigits.indexOf(char);
        if(index !== -1){
            return index.toString();
        }
        return char;
    }).join('');
}


function toPersianDigits(text){
    const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return text.split('').map((char)=>{
        const index = englishDigits.indexOf(char);
        if(index !== -1){
            return persianDigits[index];
        }
        return char;
    }).join('');
};

function securePhoneNumber(text){
    return text.replace(/(?<!\d)(09\d{9})(?!\d)/g, (phone)=>{
        return phone.slice(0, 4) + '***' + phone.slice(7);
    });
};

function countNumbers(text){
    const matches = text.match(/09\d{9}/g);
    return matches ? matches.length : 0;
};

mask.addEventListener('click', ()=>{
    const text = input.value;
    if(!text) return;

    const hasPersianDigits = /[۰-۹]/.test(text);

    const normalizedText = normalizeDigits(text);
    console.log('1:', normalizedText);

    let result = securePhoneNumber(normalizedText);
    console.log('2:', result);
    
    const count = countNumbers(normalizedText);

    if(hasPersianDigits){
        result = toPersianDigits(result);
        console.log('3:', result);
    }

    output.value = result;
    autoResize(output);
    status.textContent = `${count} number(s) masked`;

    sessionStorage.setItem('input', text);
    sessionStorage.setItem('output', result);
    sessionStorage.setItem('status', count);
});

clear.addEventListener('click', ()=>{
    input.value = '';
    output.value = '';
    status.textContent = '';

    autoResize(input);
    autoResize(output);

    sessionStorage.removeItem('input');
    sessionStorage.removeItem('output');
    sessionStorage.removeItem('status');
});

copy.addEventListener('click', async ()=>{
    const text = output.value;
    if (!text) return;
    try {
        await
        navigator.clipboard.writeText(text);
        copy.textContent = 'copied';
        setTimeout(()=>{
            copy.textContent = 'copy'
        }, 1200);
    } catch (error) {
        console.error('copy failed: ', error); 
    }
});

function autoResize(el){
    el.style.height = "auto";
    el.style.height =  Math.min(el.scrollHeight, 100) + "px";    
};
input.addEventListener('input', ()=>{
    autoResize(input);
});

window.addEventListener('DOMContentLoaded', ()=>{
    const savedInput = sessionStorage.getItem('input');
    const savedOutput = sessionStorage.getItem('output');
    const savedStatus = sessionStorage.getItem('status');

    if(savedInput){
        input.value = savedInput;
    };
    if(savedOutput){
        output.value = savedOutput;
    };
    if(savedStatus){
        status.textContent = `${savedStatus} number(s) masked`;
    };
});