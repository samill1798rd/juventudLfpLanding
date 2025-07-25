import React, { useState, useEffect } from "react";
import { ArrowLeft, Phone, Mail, FileText, Award, User, MapPin } from "lucide-react";

type Candidate = {
	id: number;
	foto: string;
	nombreBoleta: string;
	numeroCasilla: string;
	posicion: string;
	brevePerfilIntro: string;
	brevePerfil: string;
	funcionesAnteriores: string;
	porqueEleccion: string;
	telefono: string;
	correo: string;
	archivo: string;
};

const CandidatesApp = () => {
	const [candidates, setCandidates] = useState<Candidate[]>([]);
	const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("nacional");

	// Datos de ejemplo simulando una API
	const mockApiData = [
		{
			id: 1,
			foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
			nombreBoleta: "María González",
			numeroCasilla: "001",
			posicion: "Dirección Central Nacional",
			brevePerfilIntro: "Abogada especializada en derechos juveniles con 8 años de experiencia...",
			brevePerfil:
				"Abogada especializada en derechos juveniles con 8 años de experiencia en organizaciones civiles. Ha trabajado incansablemente por la inclusión de jóvenes en espacios de toma de decisiones y ha liderado iniciativas de formación política para nuevos líderes.",
			funcionesAnteriores:
				"Secretaria de Juventud Regional (2020-2023), Coordinadora de Programas Juveniles (2018-2020), Miembro del Consejo Consultivo Nacional de Juventud",
			porqueEleccion:
				"Mi experiencia en el trabajo directo con jóvenes de diferentes sectores me ha dado una perspectiva única sobre los desafíos que enfrentamos. Creo firmemente en la importancia de crear espacios genuinos de participación y en desarrollar políticas públicas que realmente respondan a nuestras necesidades.",
			telefono: "+1 829-555-0123",
			correo: "maria.gonzalez@juventudparticipa.org",
			archivo: "https://example.com/cv-maria-gonzalez.pdf",
		},
		{
			id: 2,
			foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
			nombreBoleta: "Carlos Rodríguez",
			numeroCasilla: "002",
			posicion: "Dirección Central Local",
			brevePerfilIntro: "Ingeniero de sistemas y activista digital enfocado en innovación política...",
			brevePerfil:
				"Ingeniero de sistemas y activista digital enfocado en innovación política y transparencia. Ha desarrollado plataformas tecnológicas para facilitar la participación ciudadana y ha promovido el uso de herramientas digitales en procesos democráticos.",
			funcionesAnteriores:
				"Coordinador de Innovación Digital (2021-2024), Miembro del Comité de Tecnología Política, Voluntario en campañas de transparencia electoral",
			porqueEleccion:
				"La política necesita renovarse y adaptarse a los tiempos actuales. Mi experiencia en tecnología me permite proponer soluciones innovadoras para hacer que la participación política sea más accesible, transparente y efectiva para todos los jóvenes.",
			telefono: "+1 829-555-0124",
			correo: "carlos.rodriguez@juventudparticipa.org",
			archivo: "https://example.com/cv-carlos-rodriguez.pdf",
		},
		{
			id: 3,
			foto: "https://images.unsplash.com/photo-1494790108755-2616b612b634?w=200&h=200&fit=crop&crop=face",
			nombreBoleta: "Ana Patricia Martínez",
			numeroCasilla: "003",
			posicion: "Dirección Central Nacional",
			brevePerfilIntro: "Psicóloga social con especialización en desarrollo comunitario...",
			brevePerfil:
				"Psicóloga social con especialización en desarrollo comunitario y liderazgo juvenil. Ha coordinado programas de formación política en comunidades rurales y urbanas, con un enfoque especial en la inclusión de mujeres jóvenes en espacios de poder.",
			funcionesAnteriores:
				"Directora de Programas Comunitarios (2019-2024), Coordinadora de Género y Juventud (2017-2019), Facilitadora en talleres de liderazgo juvenil",
			porqueEleccion:
				"He dedicado mi carrera a empoderar a jóvenes, especialmente mujeres, para que asuman roles de liderazgo. Mi experiencia trabajando directamente en comunidades me ha enseñado la importancia de escuchar y crear políticas inclusivas que reflejen la diversidad de nuestra juventud.",
			telefono: "+1 829-555-0125",
			correo: "ana.martinez@juventudparticipa.org",
			archivo: "https://example.com/cv-ana-martinez.pdf",
		},
		{
			id: 4,
			foto: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face",
			nombreBoleta: "David Hernández",
			numeroCasilla: "004",
			posicion: "Dirección Central Local",
			brevePerfilIntro: "Economista y emprendedor social con experiencia en políticas públicas...",
			brevePerfil:
				"Economista y emprendedor social con experiencia en políticas públicas y desarrollo económico local. Ha liderado iniciativas de emprendimiento juvenil y ha trabajado en la formulación de políticas de empleo para jóvenes a nivel municipal y regional.",
			funcionesAnteriores:
				"Coordinador de Desarrollo Económico Juvenil (2020-2024), Asesor en Políticas de Empleo Joven (2018-2020), Fundador de la Red de Emprendedores Jóvenes",
			porqueEleccion:
				"Los jóvenes necesitamos oportunidades económicas reales y políticas que fomenten el emprendimiento y la innovación. Mi experiencia en el sector económico me permite aportar una perspectiva práctica sobre cómo generar empleos dignos y oportunidades de desarrollo para nuestra generación.",
			telefono: "+1 829-555-0126",
			correo: "david.hernandez@juventudparticipa.org",
			archivo: "https://example.com/cv-david-hernandez.pdf",
		},
		{
			id: 5,
			foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
			nombreBoleta: "Laura Morales",
			numeroCasilla: "005",
			posicion: "Dirección Central Nacional",
			brevePerfilIntro: "Comunicadora social especializada en campañas políticas digitales...",
			brevePerfil:
				"Comunicadora social especializada en campañas políticas digitales y movilización juvenil. Ha liderado estrategias de comunicación para organizaciones juveniles y ha desarrollado contenido educativo sobre participación política para redes sociales.",
			funcionesAnteriores:
				"Coordinadora de Comunicaciones (2021-2024), Especialista en Redes Sociales (2019-2021), Productora de contenido educativo político",
			porqueEleccion:
				"La comunicación efectiva es clave para conectar con los jóvenes y motivar su participación política. Mi experiencia en medios digitales me permite entender cómo llegar a nuestra generación de manera auténtica y crear estrategias que realmente generen impacto y movilización.",
			telefono: "+1 829-555-0127",
			correo: "laura.morales@juventudparticipa.org",
			archivo: "https://example.com/cv-laura-morales.pdf",
		},
		{
			id: 6,
			foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
			nombreBoleta: "Roberto Silva",
			numeroCasilla: "006",
			posicion: "Dirección Central Local",
			brevePerfilIntro: "Sociólogo con experiencia en organización comunitaria y desarrollo local...",
			brevePerfil:
				"Sociólogo con experiencia en organización comunitaria y desarrollo local. Ha trabajado en proyectos de participación ciudadana a nivel municipal y ha coordinado iniciativas de desarrollo sostenible en comunidades urbanas y rurales.",
			funcionesAnteriores:
				"Coordinador de Desarrollo Local (2020-2024), Facilitador de Participación Ciudadana (2018-2020), Consultor en Proyectos Comunitarios",
			porqueEleccion:
				"El cambio real comienza a nivel local, en nuestras comunidades. Mi experiencia trabajando directamente con ciudadanos me ha enseñado la importancia de construir desde la base y crear soluciones que realmente respondan a las necesidades específicas de cada territorio.",
			telefono: "+1 829-555-0128",
			correo: "roberto.silva@juventudparticipa.org",
			archivo: "https://example.com/cv-roberto-silva.pdf",
		},
	];

	useEffect(() => {
		// Simular llamada a API
		const fetchCandidates = async () => {
			setLoading(true);
			// Simular delay de API
			await new Promise((resolve) => setTimeout(resolve, 1000));
			setCandidates(mockApiData);
			setLoading(false);
		};

		fetchCandidates();
	}, []);

	const handleViewProfile = (candidate: Candidate) => {
		setSelectedCandidate(candidate);
	};

	const handleBackToList = () => {
		setSelectedCandidate(null);
	};

	// Filtrar candidatos por posición
	const candidatosNacionales = candidates.filter((c) => c.posicion === "Dirección Central Nacional");
	const candidatosLocales = candidates.filter((c) => c.posicion === "Dirección Central Local");
	const candidatosFiltrados = activeTab === "nacional" ? candidatosNacionales : candidatosLocales;

	if (loading) {
		return (
			<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				<div className="text-center">
					<div className="w-16 h-16 mx-auto mb-4 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
					<p className="text-lg text-white">Cargando candidatos...</p>
				</div>
			</div>
		);
	}

	if (selectedCandidate) {
		return (
			<div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
				{/* Header */}
				<div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
					<div className="max-w-6xl px-6 py-4 mx-auto">
						<div className="flex items-center justify-between">
							<div className="flex items-center space-x-4">
								<div className="flex items-center space-x-2">
									<div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-lg">
										<div className="w-4 h-4 bg-white rounded-sm"></div>
									</div>
									<span className="text-xl font-bold text-white">Juventud Participa FP</span>
								</div>
							</div>
							<button
								onClick={handleBackToList}
								className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
								<ArrowLeft size={20} />
								<span>Volver a candidatos</span>
							</button>
						</div>
					</div>
				</div>

				{/* Profile Content */}
				<div className="max-w-4xl px-6 py-8 mx-auto">
					<div className="overflow-hidden bg-white shadow-2xl rounded-3xl">
						{/* Header Section */}
						<div className="px-8 py-12 text-white bg-gradient-to-r from-green-500 to-green-600">
							<div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
								<div className="relative">
									<img
										src={selectedCandidate.foto}
										alt={selectedCandidate.nombreBoleta}
										className="object-cover w-32 h-32 border-4 border-white rounded-full shadow-lg"
									/>
									<div className="absolute flex items-center justify-center w-12 h-12 text-lg font-bold text-green-600 bg-white rounded-full shadow-lg -bottom-2 -right-2">
										{selectedCandidate.numeroCasilla}
									</div>
								</div>
								<div className="text-center md:text-left">
									<h1 className="mb-2 text-3xl font-bold">{selectedCandidate.nombreBoleta}</h1>
									<div className="flex items-center justify-center mb-4 space-x-2 md:justify-start">
										<MapPin size={20} />
										<span className="text-lg opacity-90">{selectedCandidate.posicion}</span>
									</div>
									<div className="inline-block px-4 py-2 rounded-lg bg-white/20">
										<span className="font-semibold">Casilla #{selectedCandidate.numeroCasilla}</span>
									</div>
								</div>
							</div>
						</div>

						{/* Content Sections */}
						<div className="p-8 space-y-8">
							{/* Perfil */}
							<section>
								<div className="flex items-center mb-4 space-x-3">
									<div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
										<User className="text-green-600" size={20} />
									</div>
									<h2 className="text-2xl font-bold text-gray-800">Perfil</h2>
								</div>
								<p className="leading-relaxed text-gray-600">{selectedCandidate.brevePerfil}</p>
							</section>

							{/* Experiencia */}
							<section>
								<div className="flex items-center mb-4 space-x-3">
									<div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
										<Award className="text-blue-600" size={20} />
									</div>
									<h2 className="text-2xl font-bold text-gray-800">Funciones Partidarias Anteriores</h2>
								</div>
								<p className="leading-relaxed text-gray-600">{selectedCandidate.funcionesAnteriores}</p>
							</section>

							{/* Propuesta */}
							<section>
								<div className="flex items-center mb-4 space-x-3">
									<div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg">
										<FileText className="text-purple-600" size={20} />
									</div>
									<h2 className="text-2xl font-bold text-gray-800">¿Por qué considera que debe ser electo?</h2>
								</div>
								<p className="leading-relaxed text-gray-600">{selectedCandidate.porqueEleccion}</p>
							</section>

							{/* Contact Info */}
							<section className="p-6 bg-gray-50 rounded-xl">
								<h2 className="mb-6 text-2xl font-bold text-gray-800">Información de Contacto</h2>
								<div className="grid gap-6 md:grid-cols-2">
									<div className="flex items-center space-x-3">
										<div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
											<Phone className="text-green-600" size={20} />
										</div>
										<div>
											<p className="text-sm text-gray-500">Teléfono</p>
											<p className="font-semibold text-gray-800">{selectedCandidate.telefono}</p>
										</div>
									</div>
									<div className="flex items-center space-x-3">
										<div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
											<Mail className="text-blue-600" size={20} />
										</div>
										<div>
											<p className="text-sm text-gray-500">Correo electrónico</p>
											<p className="font-semibold text-gray-800">{selectedCandidate.correo}</p>
										</div>
									</div>
								</div>
								<div className="pt-6 mt-6 border-t border-gray-200">
									<a
										href={selectedCandidate.archivo}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center px-6 py-3 space-x-2 text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600">
										<FileText size={20} />
										<span>Ver documento completo</span>
									</a>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen min-w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
			{/* Header */}
			<div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
				<div className="max-w-6xl px-6 py-4 mx-auto">
					<div className="flex items-center space-x-2">
						<div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-lg">
							<div className="w-4 h-4 bg-white rounded-sm"></div>
						</div>
						<span className="text-xl font-bold text-white">Juventud Participa FP</span>
					</div>
				</div>
			</div>

			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<div className="max-w-6xl px-6 py-16 mx-auto">
					<div className="flex items-center justify-between">
						<div className="max-w-2xl">
							<div className="flex items-center mb-6 space-x-3">
								<div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-2xl">
									<Award className="text-white" size={24} />
								</div>
								<div className="w-2 h-2 bg-green-400 rounded-full"></div>
							</div>
							<h1 className="mb-6 text-5xl font-bold text-white">Nuestros Candidatos</h1>
							<p className="text-xl leading-relaxed text-gray-300">
								Conoce a los jóvenes líderes que aspiran a representarte y transformar nuestra organización.
							</p>
						</div>

						{/* Decorative elements inspired by the design */}
						<div className="relative hidden lg:block">
							<div className="flex flex-wrap max-w-md gap-4">
								{candidates.slice(0, 6).map((candidate, index) => (
									<div
										key={candidate.id}
										className={`rounded-full overflow-hidden ${
											index === 0
												? "w-24 h-16 bg-green-500"
												: index === 1
												? "w-16 h-16 border-4 border-green-500"
												: index === 2
												? "w-20 h-14 bg-green-500"
												: index === 3
												? "w-12 h-12 bg-green-400"
												: index === 4
												? "w-18 h-12 bg-green-500"
												: "w-16 h-16 bg-green-400"
										}`}>
										{(index === 1 || index === 2 || index === 4) && <img src={candidate.foto} alt="" className="object-cover w-full h-full" />}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Tabs Section */}
			<div className="max-w-6xl px-6 mx-auto">
				<div className="flex justify-center mb-12">
					<div className="p-2 border border-gray-700 bg-gray-800/50 backdrop-blur-sm rounded-2xl">
						<div className="flex space-x-2">
							<button
								onClick={() => setActiveTab("nacional")}
								className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
									activeTab === "nacional"
										? "bg-green-900 text-white shadow-lg transform scale-105"
										: "text-gray-300 bg-amber-700 hover:text-white hover:bg-gray-700/50"
								}`}>
								Dirección Central Nacional
								<span className="px-2 py-1 ml-2 text-sm rounded-full bg-white/20">{candidatosNacionales.length}</span>
							</button>
							<button
								onClick={() => setActiveTab("local")}
								className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
									activeTab === "local"
										? "bg-green-500 text-white shadow-lg transform scale-105"
										: "text-gray-300 hover:text-white hover:bg-gray-700/50"
								}`}>
								Dirección Central Local
								<span className="px-2 py-1 ml-2 text-sm rounded-full bg-white/20">{candidatosLocales.length}</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Candidates Grid */}
			<div className="max-w-6xl px-6 pb-16 mx-auto">
				<div className="mb-8 text-center">
					<h2 className="mb-4 text-3xl font-bold text-white">
						{activeTab === "nacional" ? "Candidatos Dirección Central Nacional" : "Candidatos Dirección Central Local"}
					</h2>
					<p className="text-gray-300">
						{activeTab === "nacional"
							? "Líderes con visión estratégica para guiar la organización a nivel nacional"
							: "Representantes comprometidos con el desarrollo local y comunitario"}
					</p>
				</div>

				{candidatosFiltrados.length > 0 ? (
					<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
						{candidatosFiltrados.map((candidate) => (
							<div
								key={candidate.id}
								className="overflow-hidden transition-all duration-300 bg-white shadow-xl rounded-3xl hover:transform hover:scale-105 group">
								<div className="relative">
									<img
										src={candidate.foto}
										alt={candidate.nombreBoleta}
										className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-green-500 rounded-full shadow-lg top-4 right-4">
										{candidate.numeroCasilla}
									</div>
									<div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/20 to-transparent group-hover:opacity-100"></div>
								</div>

								<div className="p-6">
									<div className="flex items-center mb-3 space-x-2">
										<div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-lg">
											<div className="w-3 h-3 bg-white rounded-sm"></div>
										</div>
										<span className="text-sm font-medium text-gray-500">{activeTab === "nacional" ? "Nacional" : "Local"}</span>
									</div>

									<h3 className="mb-3 text-xl font-bold text-gray-800">{candidate.nombreBoleta}</h3>
									<p className="mb-6 text-sm leading-relaxed text-gray-600 line-clamp-3">{candidate.brevePerfilIntro}</p>

									<button
										onClick={() => handleViewProfile(candidate)}
										className="w-full px-6 py-3 font-semibold text-white transition-all duration-200 transform shadow-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl hover:scale-105">
										Ver perfil completo
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className="py-16 text-center">
						<div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-gray-700 rounded-full">
							<User className="text-gray-400" size={40} />
						</div>
						<h3 className="mb-4 text-2xl font-bold text-white">No hay candidatos disponibles</h3>
						<p className="text-gray-300">
							No se encontraron candidatos para {activeTab === "nacional" ? "Dirección Central Nacional" : "Dirección Central Local"}
						</p>
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="mt-16 border-t border-gray-700 bg-gray-800/50 backdrop-blur-sm">
				<div className="max-w-6xl px-6 py-8 mx-auto">
					<div className="text-center">
						<div className="flex items-center justify-center mb-4 space-x-2">
							<div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-lg">
								<div className="w-4 h-4 bg-white rounded-sm"></div>
							</div>
							<span className="text-xl font-bold text-white">Juventud Participa FP</span>
						</div>
						<p className="text-gray-300">Construyendo el futuro de nuestra organización</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CandidatesApp;
