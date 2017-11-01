import Settings from "./Settings";
import Node from "./Node";

class Model {
    nodes = []
    head = null
    toDraw = []
    focus = null
}

class Controller {
    first = true
    maxRadius = Math.min(width, height)
}

class View {
    cvs: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    drawEdge(n: Node, o: Node) {
        let prn = n.getPosRad();
        let pro = o.getPosRad();
        let uv = [pro[0] - prn[0], pro[1] - prn[1]];
        let scalar = Math.sqrt(uv[0] * uv[0] + uv[1] * uv[1]);
        uv[0] /= scalar;
        uv[1] /= scalar;
        this.ctx.beginPath()
        this.ctx.moveTo(prn[0] + uv[0] * prn[2], prn[1] + uv[1] * prn[2]);
        this.ctx.lineTo(pro[0] - uv[0] * pro[2], pro[1] - uv[1] * pro[2]);
        if (n.partOfPath && o.partOfPath) {
            this.ctx.strokeStyle = Settings.node.back;
        } else {
            this.ctx.strokeStyle = Settings.node.border;
        }
        this.ctx.lineWidth = n.getPosRad()[2] / Math.pow(1.2, n.depth + 15);
        this.ctx.stroke()
    }
    drawText(n) {
        let pr = n.getPosRad();
        this.ctx.font = Math.floor(pr[2] / 2.6) + "px Arial";
        this.ctx.fillStyle = Settings.canvas.color;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        let splitText: any = "";
        if (n.text.length > 10 && n.text.search(" ") != -1) {
            splitText = n.text.split(" ");
            for (var i = 0; i < splitText.length; i++) {
                this.ctx.fillText(splitText[i], pr[0],
                    pr[1] - pr[2] * .8 +
                    (pr[2]) * (i + 1) / splitText.length);
            }
        } else if (n.text.length > 10 && n.text.search("-") != -1) {
            splitText = n.text.split("-");
            splitText[0] += "-"
            for (var i = 0; i < splitText.length; i++) {
                this.ctx.fillText(splitText[i], pr[0],
                    pr[1] - pr[2] * .8 +
                    (pr[2]) * (i + 1) / splitText.length);
            }
        } else {
            this.ctx.fillText(n.text, pr[0], pr[1]);
        }
    }
    drawFromNode(n, prev) {
        if (n.visited) {
            n.visited = true;
        }
        //draw edges first
        for (var i = 0; i < n.connected.length; i++) {
            if (n.connected[i].visited) continue;
            var o = n.connected[i];
            this.drawEdge(n, o);
        }

        //draw my neighbors
        for (var i = 0; i < n.connected.length; i++) {
            if (n.connected[i].visited) continue;
            var o = n.connected[i];
            this.drawFromNode(o, n);
        }
        //then draw myself
        var pr = n.getPosRad();
        this.ctx.beginPath();
        this.ctx.arc(pr[0], pr[1], pr[2], 2 * Math.PI, 0); //// Last argument was false? 
        this.ctx.fillStyle = "linen";

        this.ctx.shadowBlur = 20;
        this.ctx.shadowOffsetX = 10;
        this.ctx.shadowOffsetY = 10;
        this.ctx.fill();
        this.ctx.lineWidth = n.getPosRad()[2] / Math.pow(1.2, n.depth + 15);
        if (n.partOfPath) {
            this.ctx.strokeStyle = Settings.node.back;
        } else {
            this.ctx.strokeStyle = Settings.node.border;
        }
        this.ctx.stroke();
        //only draw text if there is text to draw
        if (n.text) {
            this.drawText(n); //// pr[2] was passed in?
        }
    }
}









export default class Graph {
    model = new Model();
    controller = new Controller();
    view = new View();

    constructor(width: number, height: number) {

    }
}