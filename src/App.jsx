import { useEffect, useRef, useState } from "react";

const PERFIL = {
  nome: "Eduardo Fonseca",
  titulo: "Analista de Cibersegurança | Blue Team",
  frases: [
    "Defesa Cibernética",
    "Resposta a Incidentes",
    "SOC & Threat Hunting",
    "Análise de Malware com ML",
  ],
  resumo:
    "Pós-graduando em Defesa Cibernética e Resposta a Incidentes (Blue Team), " +
    "com base sólida em programação, desenvolvimento Web e Infraestrutura. Busco minha primeira " +
    "oportunidade em cibersegurança para proteger ambientes, detectar ameaças e responder a incidentes.",
  cv: "/cv.pdf",
  github: "https://github.com/jfonsecaedu",
  linkedin: "https://www.linkedin.com/in/eduardoj-fonseca",
  email: "jfonsecaedu@gmail.com",
};

const SOBRE = [
  "Sou Pós-graduando em Defesa Cibernética pela UFPE (CEIC), onde aprendo e crio projetos práticos sobre aspectos de segurança defensiva, criação de antivírus baseado em I.A, operações SOC, CTI e Threat Hunting, OSINT, segurança aplicada a redes de computadores, segurança de perímetro e Firewalls, entre outros.",
  "Graduado em Sistemas para Internet (UNICAP), onde aprendi e realizei diversos projetos, individuais ou em grupo, sobre desenvolvimento Web e Mobile, linguagens de programação como Java, JavaScript, TypeScript e Python, banco de dados, I.A e Machine Learning, entre outros conceitos da área de desenvolvimento.",
  "Formação técnica em Manutenção e Suporte em Informática e mais de um ano de experiência profissional em suporte técnico ao usuário. Tenho conhecimento em manutenção de computadores e periféricos, identificação e resolução de problemas em computadores, suporte ao usuário (helpdesk), cabeamento de redes, sistemas operacionais e instalação e configuração de impressoras.",
];

const HABILIDADES = [
  {
    grupo: "Segurança Defensiva",
    itens: [
      "SOC",
      "Threat Hunting",
      "CTI",
      "Resposta a Incidentes",
      "OSINT",
      "Forense Digital",
      "Firewalls",
      "Segurança Aplicada a Redes",
    ],
  },
  {
    grupo: "Desenvolvimento",
    itens: [
      "React",
      "React Native",
      "Javascript",
      "Typescript",
      "Python",
      "Java",
      "PostgreSQL",
      "API REST",
    ],
  },
  {
    grupo: "Infra",
    itens: [
      "Manutenção de Computadores",
      "Manutenção de Periféricos",
      "Cabeamento de Redes",
      "Atendimento Helpdesk",
      "Windows & Linux",
    ]
  },
  {
    grupo: "Ferramentas",
    itens: [
      "Wazuh",
      "Oracle VirtualBox",
      "Wireshark",
      "Visual Studio Code",
      "Git & GitHub",
    ],
  },
];

function ListaDeProjetos() {
  return (
    <>
      <Projeto
        name="Laboratório SOC com Wazuh SIEM"
        descricao="Laboratório SOC com três VMs (Kali Linux, Ubuntu Server e Wazuh) para simulação e detecção de ataques brute force SSH. Implementei monitoramento centralizado de logs, correlação de eventos e resposta automatizada com bloqueio do IP atacante via iptables por 180 segundos."
       img="/imgs/wazuh-soc.png"
       tags={["Wazuh", "SIEM", "Blue Team", "Active Response", "Linux"]}
       github="https://github.com/jfonsecaedu/soc-home-lab-wazuh"
      />
      <Projeto
        name="Classificador com SVM (Amadey)"
        descricao="Classificador de malware baseado em SVM treinado com a família Amadey. Features extraídas por análise estática, normalização Min-Max e validação cruzada 10-fold, com 96,56% de acurácia de teste."
        img="/imgs/amadey-project.png"
        tags={["Machine Learning", "SVM", "Malware", "Python"]}
        github="https://github.com/jfonsecaedu/classificador-svm-amadey"
      />
      <Projeto
        name="Analisador de Logs (SIEM Caseiro)"
        descricao="Ferramenta em Python que lê logs de autenticação, extrai usuário e IP com regex e detecta tentativas de brute force por contagem de falhas de login por IP, listando os endereços suspeitos acima de um limite."
        img="/imgs/siem-tool.png"
        tags={["Python", "Regex", "Blue Team", "Logs"]}
        github="https://github.com/jfonsecaedu/siem.tool"
      />
    </>
  );
}

function Projeto({ name, descricao, img, tags = [], github, demo }) {
  const [imgOk, setImgOk] = useState(Boolean(img));
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = (y / r.height - 0.5) * -8;
    const ry = (x / r.width - 0.5) * 8;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  };
  const onLeave = () => {
    ref.current.style.transform = "";
  };

  return (
    <article
      className="card reveal"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="card-img">
        {imgOk ? (
          <img
            src={img}
            alt={name}
            loading="lazy"
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="card-img-fallback">
            <ShieldIcon size={56} />
          </div>
        )}
        <div className="scan" />
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <p>{descricao}</p>
        <div className="tags">
          {tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="card-links">
          {github && (
            <a href={github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          )}
          {demo && (
            <a href={demo} target="_blank" rel="noreferrer">
              Demo ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Certificado({ name, emissor, data, img, link }) {
  const [imgOk, setImgOk] = useState(Boolean(img))
  const Wrapper = link ? 'a' : 'div'
  const extra = link ? { href: link, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Wrapper className="cert reveal" {...extra}>
      <div className="cert-badge">
        {imgOk ? (
          <img src={img} alt={name} loading="lazy" onError={() => setImgOk(false)} />
        ) : (
          <ShieldIcon size={32} />
        )}
      </div>
      <div className="cert-info">
        <h3>{name}</h3>
        <span className="cert-emissor">{emissor}</span>
        <span className="cert-data">{data}</span>
      </div>
      {link && <span className="cert-seta">↗</span>}
    </Wrapper>
  )
}

function Secao({ id, titulo, children }) {
  return (
    <section id={id} className="secao">
      <h2 className="secao-titulo reveal">
        {titulo}
        <span className="linha" />
      </h2>
      {children}
    </section>
  );
}

function ShieldIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function Digitando({ frases }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [apagando, setApagando] = useState(false);

  useEffect(() => {
    const atual = frases[i];
    let t;
    if (!apagando && txt === atual)
      t = setTimeout(() => setApagando(true), 1500);
    else if (apagando && txt === "") {
      setApagando(false);
      setI((i + 1) % frases.length);
    } else
      t = setTimeout(
        () => setTxt(atual.slice(0, txt.length + (apagando ? -1 : 1))),
        apagando ? 35 : 70,
      );
    return () => clearTimeout(t);
  }, [txt, apagando, i, frases]);

  return (
    <span className="digitando">
      {txt}
      <i className="cursor" />
    </span>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visivel"),
        ),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function App() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <>
      {/* Fundo animado */}
      <div className="bg" aria-hidden="true">
        <span className="orb o1" />
        <span className="orb o2" />
        <span className="orb o3" />
        <span className="orb o4" />
        <div className="grid" />
      </div>

      <header className={`nav ${scrolled ? "nav-scroll" : ""}`}>
        <nav>
          <a href="#sobre">Sobre</a>
          <a href="#habilidades">Skills</a>
          <a href="#projetos">Projetos</a>
          <a href="#certificados">Certificados</a>
          <a href="#contato">Contato</a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="hero">
          <p className="prompt reveal">$ whoami</p>
          <h1 className="reveal">{PERFIL.nome}</h1>
          <h2 className="subtitulo reveal">
            <Digitando frases={PERFIL.frases} />
          </h2>
          <p className="resumo reveal">{PERFIL.resumo}</p>
          <div className="botoes reveal">
            <a className="btn btn-primario" href={PERFIL.cv} download>
              ⬇ Baixar CV
            </a>
            <a className="btn btn-outline" href="#projetos">
              Ver projetos
            </a>
          </div>
          <div className="scroll-dica">↓</div>
        </section>

        {/* SOBRE */}
        <Secao id="sobre" titulo="Sobre mim">
          <div className="sobre-texto">
            {SOBRE.map((p, k) => (
              <p key={k} className="reveal">
                {p}
              </p>
            ))}
          </div>
        </Secao>

        {/* HABILIDADES */}
        <Secao id="habilidades" titulo="Habilidades">
          <div className="skills-grid">
            {HABILIDADES.map((g) => (
              <div key={g.grupo} className="skill-box reveal">
                <h3>{g.grupo}</h3>
                <div className="chips">
                  {g.itens.map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Secao>

        {/* PROJETOS */}
        <Secao id="projetos" titulo="Projetos">
          <div className="projetos-grid">
            <ListaDeProjetos />
          </div>
        </Secao>

        {/* CERTIFICADOS */}
        <Secao id="certificados" titulo="Certificados">
          <div className="certs-grid">
            <Certificado
              name="Fortinet NSE 1"
              emissor="Fortinet"
              data="Outubro/2026"
              img="/imgs/nse1.png"
              link="https://www.credly.com/badges/1d5f2360-361a-4727-a9a2-eef70f760c4d/public_url"
            />

            <Certificado
              name="Fortinet NSE 2"
              emissor="Fortinet"
              data="Outubro/2026"
              img="/imgs/nse2.png"
              link="https://www.credly.com/badges/fd6e322d-1ed8-4634-8d65-317217e7bb7f/public_url"
            />
            
            <Certificado
              name="Simplify SOC Operations with Security Fabric Analytics and Automation r05"
              emissor="Fortinet"
              data="Setembro/2026"
            />

          </div>
        </Secao>

        {/* CONTATO */}
        <Secao id="contato" titulo="Contato">
          <div className="contato reveal">
            <p>Vamos Conversar?</p>
            <a className="btn btn-primario" href={`mailto:${PERFIL.email}`}>
              ✉ {PERFIL.email}
            </a>
            <div className="redes">
              <a href={PERFIL.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={PERFIL.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </Secao>
      </main>

      <footer className="footer">
        <p className="footer-destaque">
          Aberto a oportunidades em cibersegurança e Suporte Técnico.
        </p>
        <p>
          {PERFIL.nome} · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}
