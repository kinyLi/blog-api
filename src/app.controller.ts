import { Controller, Get } from "@nestjs/common";

// 5000 主页
@Controller('/')
export class AppController {
  @Get()
  async index():Promise<any> {
    const jsx = (`
    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
      <span style="color: black; height: auto; font-size: 24px">
        Hello, The is my blog api,
      </span>
      <br>
      <a style="font-size: 20px" href="http://localhost:5000/api-docs/" >
        click my, go to api docs
      </a>
    </div>
    `);
    return jsx;
  }
}