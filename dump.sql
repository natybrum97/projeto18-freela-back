--
-- PostgreSQL database dump
--

-- Dumped from database version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.15 (Ubuntu 12.15-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cadastro; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cadastro (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    telefone text NOT NULL,
    cep character varying(8) NOT NULL,
    rua text NOT NULL,
    "numeroCasa" integer NOT NULL,
    state text NOT NULL,
    cidade text NOT NULL,
    bairro text NOT NULL,
    cpf character varying(14) NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: cadastro_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.cadastro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cadastro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.cadastro_id_seq OWNED BY public.cadastro.id;


--
-- Name: carrinho; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carrinho (
    id integer NOT NULL,
    categoria text NOT NULL,
    description text NOT NULL,
    nome text NOT NULL,
    url text NOT NULL,
    valor numeric NOT NULL,
    "idProduto" integer NOT NULL,
    "idUsuario" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: carrinho_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.carrinho_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carrinho_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.carrinho_id_seq OWNED BY public.carrinho.id;


--
-- Name: checkbox_states; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.checkbox_states (
    product_id integer NOT NULL,
    is_checked boolean NOT NULL
);


--
-- Name: compras; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.compras (
    id integer NOT NULL,
    carrinho jsonb NOT NULL,
    userid text NOT NULL,
    valor numeric NOT NULL,
    parcelas integer NOT NULL,
    tipo text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: compras_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.compras_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: compras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.compras_id_seq OWNED BY public.compras.id;


--
-- Name: duplicata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.duplicata (
    id integer NOT NULL,
    nomeproduto text NOT NULL,
    descricao text NOT NULL,
    valor numeric NOT NULL,
    url text NOT NULL,
    "selectedCategory" text NOT NULL,
    userid integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: duplicata_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.duplicata_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: duplicata_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.duplicata_id_seq OWNED BY public.duplicata.id;


--
-- Name: login; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.login (
    id integer NOT NULL,
    token text NOT NULL,
    "idUser" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: login_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.login_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: login_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.login_id_seq OWNED BY public.login.id;


--
-- Name: produtos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.produtos (
    id integer NOT NULL,
    nomeproduto text NOT NULL,
    descricao text NOT NULL,
    valor numeric NOT NULL,
    url text NOT NULL,
    "selectedCategory" text NOT NULL,
    userid integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: produtos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.produtos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: produtos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.produtos_id_seq OWNED BY public.produtos.id;


--
-- Name: userProdutos; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."userProdutos" (
    id integer NOT NULL,
    nomeproduto text NOT NULL,
    descricao text NOT NULL,
    valor numeric NOT NULL,
    url text NOT NULL,
    "selectedCategory" text NOT NULL,
    userid integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: userProdutos_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."userProdutos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: userProdutos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."userProdutos_id_seq" OWNED BY public."userProdutos".id;


--
-- Name: cadastro id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cadastro ALTER COLUMN id SET DEFAULT nextval('public.cadastro_id_seq'::regclass);


--
-- Name: carrinho id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrinho ALTER COLUMN id SET DEFAULT nextval('public.carrinho_id_seq'::regclass);


--
-- Name: compras id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.compras ALTER COLUMN id SET DEFAULT nextval('public.compras_id_seq'::regclass);


--
-- Name: duplicata id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.duplicata ALTER COLUMN id SET DEFAULT nextval('public.duplicata_id_seq'::regclass);


--
-- Name: login id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login ALTER COLUMN id SET DEFAULT nextval('public.login_id_seq'::regclass);


--
-- Name: produtos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.produtos ALTER COLUMN id SET DEFAULT nextval('public.produtos_id_seq'::regclass);


--
-- Name: userProdutos id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userProdutos" ALTER COLUMN id SET DEFAULT nextval('public."userProdutos_id_seq"'::regclass);


--
-- Data for Name: cadastro; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.cadastro VALUES (1, 'nat', 'nat@gmail.com', '21969895746', '22222222', 'Rua tharsis e paula', 342, 'RJ', 'seropedica', 'Fazenda Caxias', '222.222.222-22', '$2b$10$L4CetyGTtJwRxghynyBmpOUcn1M37TgU4qzbd2SnikSiVpnevKBAy', '2023-08-10 02:20:55.686566');
INSERT INTO public.cadastro VALUES (2, 'nath', 'nath@gmail.com', '21969895746', '22222222', 'Tharsis e Paula', 342, 'RJ', 'seropedica', 'Fazenda Caxias', '222.222.222-22', '$2b$10$d/6.ujUuMZhfgES23K16ye/GbZGDVPveZSqgRkvUu6XzMjs7uOnkq', '2023-08-10 07:35:31.587745');
INSERT INTO public.cadastro VALUES (3, 'Thor', 'thor@gmail.com', '21969895746', '33333333', 'Rua tharsis e paula', 342, 'RJ', 'Seropedica', 'Fazenda Caxias', '444.444.444-44', '$2b$10$vsdZg6zXHjfVMVWejOcACezwlzt/1Kdhzqo1arONGu8v..xXS447.', '2023-08-10 19:19:22.408886');
INSERT INTO public.cadastro VALUES (4, 'Well', 'well@gmail.com', '21969895746', '33333333', 'Rua tharsis e paula', 342, 'RJ', 'Seropedica', 'Fazenda Caxias', '444.444.444-44', '$2b$10$TLYW6Ziip5JvEO/kL2edr.7epbn03behbYzDxuhnSmToRgl7iQIXK', '2023-08-10 19:37:26.460731');


--
-- Data for Name: carrinho; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: checkbox_states; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.checkbox_states VALUES (39, true);
INSERT INTO public.checkbox_states VALUES (40, true);
INSERT INTO public.checkbox_states VALUES (41, true);
INSERT INTO public.checkbox_states VALUES (42, true);


--
-- Data for Name: compras; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.compras VALUES (5, '[{"id": 26, "url": "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a34-128gb-preto-5g-octa-core-6gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/236822000/ae9f6793ae5b65eed65659776d7b94d5.jpg", "nome": "Apple iPhone 14 Pro Max (512 GB) - Roxo-profundo", "valor": "100000", "categoria": "Smartphones", "createdAt": "2023-08-13T09:59:29.710Z", "idProduto": 38, "idUsuario": 4, "description": "smartphone"}, {"id": 27, "url": "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a34-128gb-preto-5g-octa-core-6gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/236822000/ae9f6793ae5b65eed65659776d7b94d5.jpg", "nome": "Apple iPhone 14 Pro Max (512 GB) - Roxo-profundo", "valor": "100000", "categoria": "Smartphones", "createdAt": "2023-08-13T09:59:33.309Z", "idProduto": 38, "idUsuario": 4, "description": "smartphone"}]', '4', 200000, 1, 'Boleto', '2023-08-13 07:03:06.820433');
INSERT INTO public.compras VALUES (6, '[{"id": 30, "url": "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a34-128gb-preto-5g-octa-core-6gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/236822000/ae9f6793ae5b65eed65659776d7b94d5.jpg", "nome": "ei", "valor": "1000", "categoria": "Notebooks", "createdAt": "2023-08-13T10:13:50.422Z", "idProduto": 39, "idUsuario": 4, "description": "ei"}]', '4', 1000, 1, 'Boleto', '2023-08-13 07:14:13.974001');
INSERT INTO public.compras VALUES (7, '[{"id": 31, "url": "https://a-static.mlcdn.com.br/800x560/controle-inteligente-universal-wi-fi-positivo-smarthome-smart/jbatacadista/db955e744ca811edb61d4201ac185019/8c3e0807b0bab735759e9af25ac2e1cc.jpeg", "nome": "Notebook Acer Vero Ecológico AV15-51-58ZM Ci5 Windows 11 Home 8Gb 512Gb SSD 15.6”", "valor": "10000", "categoria": "Smartphones", "createdAt": "2023-08-13T10:15:04.767Z", "idProduto": 40, "idUsuario": 4, "description": "Deixe a sua casa ainda mais funcional, moderna e com todos os controles remotos concentrados em apenas um único aplicativo com o controle inteligente Smart, linha Smarthome da Positivo."}]', '4', 10000, 1, 'Boleto', '2023-08-13 07:15:14.421082');
INSERT INTO public.compras VALUES (8, '[{"id": 32, "url": "https://a-static.mlcdn.com.br/800x560/notebook-acer-vero-ecologico-av15-51-58zm-ci5-windows-11-home-8gb-512gb-ssd-15-6/aceroficial/1008/4ee84835c69abb2eb8078cfe671967eb.jpeg", "nome": "Notebook Acer Vero Ecológico AV15-51-58ZM Ci5 Windows 11 Home 8Gb 512Gb SSD 15.6”", "valor": "100000", "categoria": "Notebooks", "createdAt": "2023-08-13T10:18:57.267Z", "idProduto": 41, "idUsuario": 4, "description": "Deixe a sua casa ainda mais funcional, moderna e com todos os controles remotos concentrados em apenas um único aplicativo com o controle inteligente Smart, linha Smarthome da Positivo."}, {"id": 33, "url": "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a34-128gb-preto-5g-octa-core-6gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/236822000/ae9f6793ae5b65eed65659776d7b94d5.jpg", "nome": "Apple iPhone 14 Pro Max (512 GB) - Roxo-profundo", "valor": "200000", "categoria": "Smartphones", "createdAt": "2023-08-13T10:19:02.552Z", "idProduto": 42, "idUsuario": 4, "description": "smartphone"}]', '4', 300000, 1, 'Cartão de Crédito', '2023-08-13 07:19:54.313813');


--
-- Data for Name: duplicata; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.duplicata VALUES (39, 'ei', 'ei', 1000, 'https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a34-128gb-preto-5g-octa-core-6gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/236822000/ae9f6793ae5b65eed65659776d7b94d5.jpg', 'Notebooks', 4, '2023-08-13 07:05:05.939322');
INSERT INTO public.duplicata VALUES (40, 'Notebook Acer Vero Ecológico AV15-51-58ZM Ci5 Windows 11 Home 8Gb 512Gb SSD 15.6”', 'Deixe a sua casa ainda mais funcional, moderna e com todos os controles remotos concentrados em apenas um único aplicativo com o controle inteligente Smart, linha Smarthome da Positivo.', 10000, 'https://a-static.mlcdn.com.br/800x560/controle-inteligente-universal-wi-fi-positivo-smarthome-smart/jbatacadista/db955e744ca811edb61d4201ac185019/8c3e0807b0bab735759e9af25ac2e1cc.jpeg', 'Smartphones', 4, '2023-08-13 07:14:53.404177');
INSERT INTO public.duplicata VALUES (41, 'Notebook Acer Vero Ecológico AV15-51-58ZM Ci5 Windows 11 Home 8Gb 512Gb SSD 15.6”', 'Deixe a sua casa ainda mais funcional, moderna e com todos os controles remotos concentrados em apenas um único aplicativo com o controle inteligente Smart, linha Smarthome da Positivo.', 100000, 'https://a-static.mlcdn.com.br/800x560/notebook-acer-vero-ecologico-av15-51-58zm-ci5-windows-11-home-8gb-512gb-ssd-15-6/aceroficial/1008/4ee84835c69abb2eb8078cfe671967eb.jpeg', 'Notebooks', 4, '2023-08-13 07:15:50.990458');
INSERT INTO public.duplicata VALUES (42, 'Apple iPhone 14 Pro Max (512 GB) - Roxo-profundo', 'smartphone', 200000, 'https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a34-128gb-preto-5g-octa-core-6gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/236822000/ae9f6793ae5b65eed65659776d7b94d5.jpg', 'Smartphones', 4, '2023-08-13 07:16:28.116603');
INSERT INTO public.duplicata VALUES (43, 'Micro-ondas Philco PMO28TF Flat Sem Prato Giratório 28L 1400W', 'Deixe a sua casa ainda mais funcional, moderna e com todos os controles remotos concentrados em apenas um único aplicativo com o controle inteligente Smart, linha Smarthome da Positivo.', 20000, 'https://a-static.mlcdn.com.br/800x560/micro-ondas-philco-pmo28tf-flat-sem-prato-giratorio-28l-1400w/britania/6725/220ce00acc7c982c6fe27e1db5c064d8.jpeg', 'Eletrodomésticos', 4, '2023-08-13 07:17:05.583367');


--
-- Data for Name: login; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.login VALUES (1, 'e77d7a62-7cf5-4244-afbf-3f71d7a0fdcc', 2, '2023-08-10 07:35:54.665509');
INSERT INTO public.login VALUES (2, 'c3eb9f80-9bd2-4260-b775-a52996fc62de', 2, '2023-08-10 07:37:00.743313');
INSERT INTO public.login VALUES (3, 'efb20e4d-90d9-4925-8217-e3c864c72cb3', 2, '2023-08-10 18:41:03.693098');
INSERT INTO public.login VALUES (4, '080741db-6703-4a45-ba8d-b569bcd84933', 2, '2023-08-10 19:00:50.87379');
INSERT INTO public.login VALUES (5, '9372e234-1686-4faa-a6bc-dffca41905b6', 2, '2023-08-10 19:02:07.441715');
INSERT INTO public.login VALUES (6, '22d61ae6-2331-4148-af55-861026f4fc17', 3, '2023-08-10 19:19:35.923657');
INSERT INTO public.login VALUES (7, '84fe70b1-2d4a-4d52-98ee-132653ed1756', 4, '2023-08-10 19:37:38.753304');
INSERT INTO public.login VALUES (8, '25fe55e0-3672-42d2-b309-458c97a0ea03', 1, '2023-08-11 04:39:11.494849');
INSERT INTO public.login VALUES (9, '69df85bd-2d9b-4a86-bffc-3dd49ddfcc28', 1, '2023-08-11 07:18:47.890872');
INSERT INTO public.login VALUES (10, '8a14a5c8-3d9b-4658-93b9-bd9a6c4b97ca', 3, '2023-08-11 08:40:09.5231');
INSERT INTO public.login VALUES (11, 'a7835d77-7bc6-4ba9-ae96-37a178663055', 4, '2023-08-12 03:16:43.589098');
INSERT INTO public.login VALUES (12, 'c1433842-8e75-486f-bfa8-9881f196f8a2', 4, '2023-08-12 08:16:28.720041');
INSERT INTO public.login VALUES (13, '080ef820-6a27-44dc-aea5-2dd1a31ccab9', 4, '2023-08-12 08:21:48.630121');
INSERT INTO public.login VALUES (14, 'b89c3f07-008c-4c8c-9251-c84913f810f8', 4, '2023-08-12 08:49:51.875944');
INSERT INTO public.login VALUES (15, 'deb8d16b-3b02-4a32-8e24-c3d133b3659f', 4, '2023-08-12 12:28:32.111872');
INSERT INTO public.login VALUES (16, 'f86eb3eb-9ef8-43cd-8d21-aaddf382d204', 4, '2023-08-12 12:35:53.481195');
INSERT INTO public.login VALUES (17, '04a107f8-ebde-4beb-8498-1825b621ecac', 4, '2023-08-12 21:15:17.141144');
INSERT INTO public.login VALUES (18, '4898493b-b0e5-4b1b-bd10-fae7671bdd3b', 4, '2023-08-13 03:14:41.11119');
INSERT INTO public.login VALUES (19, '0e8aa8f4-525a-41c7-9c86-af693712ef46', 1, '2023-08-13 07:21:58.669826');


--
-- Data for Name: produtos; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.produtos VALUES (43, 'Micro-ondas Philco PMO28TF Flat Sem Prato Giratório 28L 1400W', 'Deixe a sua casa ainda mais funcional, moderna e com todos os controles remotos concentrados em apenas um único aplicativo com o controle inteligente Smart, linha Smarthome da Positivo.', 20000, 'https://a-static.mlcdn.com.br/800x560/micro-ondas-philco-pmo28tf-flat-sem-prato-giratorio-28l-1400w/britania/6725/220ce00acc7c982c6fe27e1db5c064d8.jpeg', 'Eletrodomésticos', 4, '2023-08-13 07:17:05.581575');


--
-- Data for Name: userProdutos; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: cadastro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.cadastro_id_seq', 4, true);


--
-- Name: carrinho_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.carrinho_id_seq', 33, true);


--
-- Name: compras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.compras_id_seq', 8, true);


--
-- Name: duplicata_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.duplicata_id_seq', 43, true);


--
-- Name: login_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.login_id_seq', 19, true);


--
-- Name: produtos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.produtos_id_seq', 43, true);


--
-- Name: userProdutos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."userProdutos_id_seq"', 1, false);


--
-- Name: cadastro cadastro_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cadastro
    ADD CONSTRAINT cadastro_email_key UNIQUE (email);


--
-- Name: cadastro cadastro_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cadastro
    ADD CONSTRAINT cadastro_pkey PRIMARY KEY (id);


--
-- Name: carrinho carrinho_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrinho
    ADD CONSTRAINT carrinho_pkey PRIMARY KEY (id);


--
-- Name: checkbox_states checkbox_states_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.checkbox_states
    ADD CONSTRAINT checkbox_states_pkey PRIMARY KEY (product_id);


--
-- Name: compras compras_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.compras
    ADD CONSTRAINT compras_pkey PRIMARY KEY (id);


--
-- Name: duplicata duplicata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.duplicata
    ADD CONSTRAINT duplicata_pkey PRIMARY KEY (id);


--
-- Name: login login_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT login_pkey PRIMARY KEY (id);


--
-- Name: produtos produtos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_pkey PRIMARY KEY (id);


--
-- Name: userProdutos userProdutos_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userProdutos"
    ADD CONSTRAINT "userProdutos_pkey" PRIMARY KEY (id);


--
-- Name: carrinho carrinho_idUsuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carrinho
    ADD CONSTRAINT "carrinho_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES public.cadastro(id);


--
-- Name: duplicata duplicata_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.duplicata
    ADD CONSTRAINT duplicata_userid_fkey FOREIGN KEY (userid) REFERENCES public.cadastro(id);


--
-- Name: login login_idUser_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.login
    ADD CONSTRAINT "login_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES public.cadastro(id);


--
-- Name: produtos produtos_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.produtos
    ADD CONSTRAINT produtos_userid_fkey FOREIGN KEY (userid) REFERENCES public.cadastro(id);


--
-- Name: userProdutos userProdutos_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."userProdutos"
    ADD CONSTRAINT "userProdutos_userid_fkey" FOREIGN KEY (userid) REFERENCES public.cadastro(id);


--
-- PostgreSQL database dump complete
--

