export const getRandomStr = (count: number) => {
  const ts = new Date().getTime()
  return Number.parseInt(String(ts).slice(count), 10) * 10 + 1
}

interface ITimer {
  id: string // 计时器id
  name: string // 计时器名字
  fn: Function // 计时器回调
  interval: number // 间隔
  count: number // 总运行次数
  complete: Function // finished 完成时的回调
  currentCount: number // 已经执行的次数
  currentAt: number // 加入时的时间（执行时时间戳）
  _this?: any
}

class Timer {
  private timerArr: Array<ITimer>
  private nameArr: Array<string>
  private isPlay: boolean
  private timeInterval: number
  private currentTime: number
  private lastTime: number
  private fps: number //每秒执行的次数
  private globalId: number
  constructor() {
    this.timerArr = []
    this.nameArr = []
    this.isPlay = false
    this.timeInterval = 0
    this.currentTime = 0
    this.lastTime = 0
    this.fps = 0
    this.globalId = 0
  }

  private init = (ms = 15) => {
    if (this.isPlay) return
    this.isPlay = true
    this.timeInterval = ms
    this.lastTime = new Date().getTime()
    this.getAnimation()
    this.globalId = window.requestAnimationFrame(this.progress)
  }

  private startTimer = () => {
    if (!this.isPlay) {
      this.init()
    }
  }

  private endTimer = () => {
    if (!this.timerArr.length && this.globalId) {
      this.isPlay = false
      window.cancelAnimationFrame(this.globalId)
    }
  }

  // 方法 间隔(ms) 次数 完成时回调
  // 返回6位字符串标识
  public add = ({
    name = '',
    fn = () => {},
    interval = 0,
    count = 0,
    complete = () => {},
    _this = null,
  }) => {
    if (name && this.nameArr.indexOf(name) > -1) {
      this.clear(name)
    }
    this.startTimer()

    // @ts-ignore
    if (_this) fn = fn.bind(_this)
    const str = `${getRandomStr(8)}`

    const obj: ITimer = {
      id: str,
      name: name || str,
      fn,
      interval,
      count,
      complete,
      currentCount: 0,
      currentAt: new Date().getTime(),
    }

    this.timerArr.push(obj)
    this.nameArr.push(obj.name)
    return str
  }

  private progress = () => {
    this.currentTime = new Date().getTime()
    this.timeInterval = this.currentTime - this.lastTime
    this.fps = (1000 / this.timeInterval) | 0
    // if (this.stat) this.stat.update()
    this.timerArr.forEach((timer) => {
      if (
        this.currentTime - timer.currentAt === timer.interval ||
        this.currentTime - timer.currentAt > timer.interval
      ) {
        if (timer.fn) {
          timer.fn(timer.currentCount)
          timer.currentAt = new Date().getTime()
        }
        timer.currentCount++
        if (timer.currentCount === timer.count) {
          if (timer.complete) timer.complete()
          this.clear(timer.id)
        }
      }
    })

    this.globalId = window.requestAnimationFrame(this.progress)
  }

  public clear = (str: string) => {
    let v = -1
    for (let i = 0; i < this.timerArr.length; i++) {
      if (this.timerArr[i].id === str || this.timerArr[i].name === str) {
        v = i
        break
      }
    }

    const obj: ITimer = this.timerArr[v]
    if (obj) {
      for (const o in obj) {
        if (obj.hasOwnProperty(o)) {
          // @ts-ignore
          delete obj[o]
        }
      }
      this.timerArr.splice(v, 1)
      this.endTimer()
    }
  }

  public clearAll = () => {
    this.timerArr.length = 0
  }

  private getAnimation = () => {
    let lastTime = 0
    const vendors = ['ms', 'moz', 'webkit', 'o']

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      // @ts-ignore
      window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`]
      // @ts-ignore
      window.cancelAnimationFrame =
        window[`${vendors[x]}CancelAnimationFrame` as any] ||
        window[`${vendors[x]}CancelRequestAnimationFrame` as any]
    }
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (callback) => {
        const currTime = new Date().getTime()
        const timeToCall = Math.max(0, 16 - (currTime - lastTime))
        const id = window.setTimeout(() => {
          callback(currTime + timeToCall)
        }, timeToCall)
        lastTime = currTime + timeToCall
        return id
      }
    }
    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = (id) => {
        clearTimeout(id)
      }
    }
  }
}

export default new Timer()

// demo
// Timer.add(() => { console.log('打印7次') }, 1000, 7, true, () => { console.log('打印七次结束') })
/**
 *
Timer.add({
   name: 'value',
   fn: () => {},
   timer:
   num: 1,
   callback: () => {}
   _this: this,
})
Timer.clear(name)
 *  */
