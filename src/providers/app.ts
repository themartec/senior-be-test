import express from "./express";

class App {
    public loadSever() {
        express.main();
        express.listen();
    }
}

export default App;