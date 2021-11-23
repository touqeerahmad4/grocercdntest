const loadFrames = callback => {
  console.log("Util has run");
  const existingScript = document.getElementById("frames");
  if (!existingScript) {
    const script = document.createElement("script");
    script.src = "https://cdn.checkout.com/js/framesv2.min.js";
    script.id = "frames";
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};
export default loadFrames;
