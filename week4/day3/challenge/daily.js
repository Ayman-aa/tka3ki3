class Video {
    constructor(title, uploader, time) {
      this.title = title;
      this.uploader = uploader;
      this.time = time;
    }
  
    watch() {
      console.log(`${this.uploader} watched all ${this.time} seconds of ${this.title}!`);
    }
  }
  
  const firstVideo = new Video("JavaScript Fundamentals", "JSDev", 600);
  firstVideo.watch();
  const secondVideo = new Video("OOP in JavaScript", "CodeMaster", 720);
  secondVideo.watch();
  
  
  const videosData = [
    { title: "React Hooks Tutorial", uploader: "ReactNinja", time: 480 },
    { title: "Node.js Crash Course", uploader: "BackendDev", time: 900 },
    { title: "CSS Grid Layout", uploader: "FrontEndWizard", time: 540 },
    { title: "TypeScript Basics", uploader: "TSLover", time: 660 },
    { title: "Git for Beginners", uploader: "DevOpsGuru", time: 420 }
  ];
  
  console.log("\nOther Videos:");
  const videoInstances = videosData.map(data => {
    const video = new Video(data.title, data.uploader, data.time);
    video.watch();
    return video;
  });