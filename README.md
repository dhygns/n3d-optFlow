# OptFlow
It's implemented to use easyful for Environment of THREEjs. However, You can use it in othor Environment with some restrictions.

##

## Install

  1. Move to your project (in console), like this...

  ``` cd user/desktop/projectFolder ```
  2. optFlow install

  ``` npm install --save n3d-optFlow ```
  3. just use it

  ```
  import OptFlow from 'n3d-optFlow'

  //setup
  ...
  var optflow = new OptFlow(renderer/*threejs renderer*/);
  ...
  //update
  optflow.update(deltatime);
  ...
  //when use optflow's texture, you should check it is ready to use.
  if(optflow.isReady()) var texture = optflow.getTexture();
  ```

##

Copyright (c) 2017 Donghyeon Kim (dhygns@naver.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this
software and associated documentation files (the "Software"), to deal in the Software
without restriction, including without limitation the rights to use, copy, modify, merge,
publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
