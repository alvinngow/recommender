import { useCallback } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

function PolygonMaker() {
	if (process.browser) {
		require("pathseg");
	}
	const particlesInit = useCallback(async (engine: Engine) => {
		console.log(engine);

		// you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(engine);
	}, []);

	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {
			await console.log(container);
		},
		[]
	);
	return (
		<Particles
			id="tsparticles"
			init={particlesInit}
			loaded={particlesLoaded}
			options={{
				fpsLimit: 60,
				fullScreen: false,

				particles: {
					color: {
						value: "#80878d",
					},
					links: {
						color: "#80878d",
						distance: 150,
						enable: true,
						opacity: 0.5,
						width: 1,
					},
					move: {
						direction: "none",
						enable: true,
						outMode: "bounce",
						speed: 2,
					},
					number: {
						density: {
							enable: true,
							area: 800,
						},
						value: 400,
					},
					opacity: {
						value: 0.5,
					},
					shape: {
						type: "triangle",
					},
					size: {
						value: { min: 1, max: 5 },
					},
				},
				detectRetina: true,
			}}
		/>
	);
}

export default PolygonMaker;
