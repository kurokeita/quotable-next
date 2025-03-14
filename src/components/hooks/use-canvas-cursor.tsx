import { useEffect } from 'react'

interface WaveConfig {
	phase?: number
	offset?: number
	frequency?: number
	amplitude?: number
}

interface LineConfig {
	spring: number
}

interface Position {
	x: number
	y: number
}

interface Config {
	debug: boolean
	friction: number
	trails: number
	size: number
	dampening: number
	tension: number
}

class Wave {
	phase: number
	offset: number
	frequency: number
	amplitude: number

	constructor(config: WaveConfig = {}) {
		this.phase = config.phase || 0
		this.offset = config.offset || 0
		this.frequency = config.frequency || 0.001
		this.amplitude = config.amplitude || 1
	}

	update(): number {
		this.phase += this.frequency
		return this.offset + Math.sin(this.phase) * this.amplitude
	}
}

class Node {
	x: number = 0
	y: number = 0
	vx: number = 0
	vy: number = 0
}

const useCanvasCursor = () => {
	class Line {
		spring: number
		friction: number
		nodes: Node[]

		constructor(config: LineConfig) {
			this.spring = config.spring + 0.1 * Math.random() - 0.02
			this.friction = E.friction + 0.01 * Math.random() - 0.002
			this.nodes = []
			for (let n = 0; n < E.size; n++) {
				const node = new Node()
				node.x = pos.x
				node.y = pos.y
				this.nodes.push(node)
			}
		}

		update(): void {
			let e = this.spring
			let t = this.nodes[0]
			t.vx += (pos.x - t.x) * e
			t.vy += (pos.y - t.y) * e
			for (let n, i = 0, a = this.nodes.length; i < a; i++) {
				t = this.nodes[i]
				if (i > 0) {
					n = this.nodes[i - 1]
					t.vx += (n.x - t.x) * e
					t.vy += (n.y - t.y) * e
					t.vx += n.vx * E.dampening
					t.vy += n.vy * E.dampening
				}
				t.vx *= this.friction
				t.vy *= this.friction
				t.x += t.vx
				t.y += t.vy
				e *= E.tension
			}
		}

		draw(): void {
			let e: Node,
				t: Node,
				n = this.nodes[0].x,
				i = this.nodes[0].y,
				a = 0

			const o = this.nodes.length - 2
			ctx.beginPath()
			ctx.moveTo(n, i)
			for (a = 1; a < o; a++) {
				e = this.nodes[a]
				t = this.nodes[a + 1]
				n = 0.5 * (e.x + t.x)
				i = 0.5 * (e.y + t.y)
				ctx.quadraticCurveTo(e.x, e.y, n, i)
			}
			e = this.nodes[a]
			t = this.nodes[a + 1]
			ctx.quadraticCurveTo(e.x, e.y, t.x, t.y)
			ctx.stroke()
			ctx.closePath()
		}
	}

	function onMousemove(e: MouseEvent | TouchEvent) {
		function o() {
			lines = []
			for (let e = 0; e < E.trails; e++) {
				lines.push(new Line({ spring: 0.4 + (e / E.trails) * 0.025 }))
			}
		}

		function c(e: MouseEvent | TouchEvent) {
			if ('touches' in e) {
				pos.x = e.touches[0].pageX
				pos.y = e.touches[0].pageY
			} else {
				pos.x = e.clientX
				pos.y = e.clientY
			}
			e.preventDefault()
		}

		function l(e: TouchEvent) {
			if (e.touches.length === 1) {
				pos.x = e.touches[0].pageX
				pos.y = e.touches[0].pageY
			}
		}

		document.removeEventListener('mousemove', onMousemove)
		document.removeEventListener('touchstart', onMousemove)
		document.addEventListener('mousemove', c)
		document.addEventListener('touchmove', c)
		document.addEventListener('touchstart', l)
		c(e)
		o()
		render()
	}

	function render() {
		if (ctx.running) {
			ctx.globalCompositeOperation = 'source-over'
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
			ctx.globalCompositeOperation = 'lighter'
			ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',50%,50%,0.2)'
			ctx.lineWidth = 1
			for (let e, t = 0; t < E.trails; t++) {
				e = lines[t]
				e.update()
				e.draw()
			}
			ctx.frame += 1
			window.requestAnimationFrame(render)
		}
	}

	function resizeCanvas() {
		ctx.canvas.width = window.innerWidth - 20
		ctx.canvas.height = window.innerHeight
	}

	let ctx: CanvasRenderingContext2D & { running: boolean; frame: number }
	let f: Wave
	let lines: Line[] = []
	const E: Config = {
		debug: true,
		friction: 0.5,
		trails: 20,
		size: 50,
		dampening: 0.25,
		tension: 0.98,
	}
	const pos: Position = { x: 0, y: 0 }

	const renderCanvas = function () {
		const canvas = document.getElementById('canvas') as HTMLCanvasElement
		ctx = canvas.getContext('2d') as CanvasRenderingContext2D & {
			running: boolean
			frame: number
		}
		ctx.running = true
		ctx.frame = 1
		f = new Wave({
			phase: Math.random() * 2 * Math.PI,
			amplitude: 85,
			frequency: 0.0015,
			offset: 285,
		})

		document.addEventListener('mousemove', onMousemove)
		document.addEventListener('touchstart', onMousemove)
		document.body.addEventListener('orientationchange', resizeCanvas)
		window.addEventListener('resize', resizeCanvas)
		window.addEventListener('focus', () => {
			if (!ctx.running) {
				ctx.running = true
				render()
			}
		})
		window.addEventListener('blur', () => {
			ctx.running = true
		})
		resizeCanvas()
	}

	useEffect(() => {
		renderCanvas()

		return () => {
			ctx.running = false
			document.removeEventListener('mousemove', onMousemove)
			document.removeEventListener('touchstart', onMousemove)
			document.body.removeEventListener('orientationchange', resizeCanvas)
			window.removeEventListener('resize', resizeCanvas)
			window.removeEventListener('focus', () => {
				if (!ctx.running) {
					ctx.running = true
					render()
				}
			})
			window.removeEventListener('blur', () => {
				ctx.running = true
			})
		}
	})
}

export default useCanvasCursor
