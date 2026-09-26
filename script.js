const screens=["home","capture","result","weather","irrigation","market"];
let selectedImage=null;
function showScreen(id){screens.forEach(s=>document.getElementById(s).classList.toggle("active",s===id));window.scrollTo(0,0);}
document.getElementById("photoInput").addEventListener("change",e=>{
 const file=e.target.files[0]; if(!file)return;
 selectedImage=file;
 const img=document.getElementById("preview");
 img.src=URL.createObjectURL(file); img.style.display="block";
 document.getElementById("analyzeBtn").classList.remove("hidden");
});
function analyze(){
 const st=document.getElementById("analysisStatus");
 st.classList.remove("hidden"); st.textContent="AI is analyzing the image...";
 setTimeout(()=>{
  st.textContent="Analysis completed";
  const wrap=document.getElementById("resultImageWrap"); wrap.innerHTML="";
  if(selectedImage){const img=document.createElement("img");img.src=URL.createObjectURL(selectedImage);img.style.width="100%";img.style.maxHeight="220px";img.style.objectFit="cover";img.style.borderRadius="12px";wrap.appendChild(img);}
  showScreen("result");
 },1400);
}
function startVoice(){
 const status=document.getElementById("voiceStatus");
 const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
 if(!SpeechRecognition){status.textContent="Voice recognition is not supported in this browser.";return;}
 const r=new SpeechRecognition(); r.lang="ta-IN"; r.interimResults=false;
 status.textContent="🎤 கேட்கிறேன்...";
 r.onresult=e=>status.textContent="நீங்கள் சொன்னது: "+e.results[0][0].transcript;
 r.onerror=()=>status.textContent="Voice input could not be started.";
 r.start();
}
function speakTamil(){
 if(!("speechSynthesis" in window))return;
 const u=new SpeechSynthesisUtterance("உங்கள் பயிரில் ஒரு இலை நோய் கண்டறியப்பட்டுள்ளது. சிகிச்சை மற்றும் தடுப்பு வழிமுறைகளைப் பின்பற்றவும்.");
 u.lang="ta-IN"; speechSynthesis.speak(u);
}
