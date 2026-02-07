import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MapPin, Phone, Mail, Star, Instagram, Facebook, MessageCircle, Menu, X, Clock, Linkedin, Youtube } from "lucide-react";
import content from "../content.json";

export default function Home() {
  const { config, seo, secoesAtivas, empresaInfo, hero, servicos, sobre, depoimentos, galeria, faq, horarios, localizacao, contato } = content;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Aplicar configurações de tema e cores
    const root = document.documentElement;
    root.style.setProperty('--primary', config.corPrimaria);
    root.style.setProperty('--secondary', config.corSecundaria);
    root.style.setProperty('--accent', config.corAcento);
    root.style.setProperty('--background', config.corFundo);
    root.style.setProperty('--background-secondary', config.corFundoSecundaria);
    root.style.setProperty('--foreground', config.corTexto);
    root.style.setProperty('--foreground-secondary', config.corTextoSecundario);
    root.style.setProperty('--radius', config.raioBorda);
    root.style.setProperty('--font-heading-family', config.fonteTitulo);
    root.style.setProperty('--font-body-family', config.fonteCorpo);
    root.style.setProperty('--max-width', config.larguraMaxima);

    if (config.tema === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Aplicar SEO
    document.title = seo.titulo;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.descricao);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = seo.descricao;
      document.head.appendChild(meta);
    }

    // Carregar fontes do Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = `https://fonts.googleapis.com/css2?family=${config.fonteTitulo.replace(' ', '+')}:wght@400;600;700&family=${config.fonteCorpo.replace(' ', '+')}:wght@300;400;500;600&display=swap`;
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }, [config, seo]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleButtonAction = (action: string) => {
    if (action === 'whatsapp') {
      window.open(`https://wa.me/${empresaInfo.whatsapp}`, '_blank');
    } else if (action.startsWith('scroll-')) {
      const section = action.replace('scroll-', '');
      scrollTo(section);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: `var(--font-body-family), sans-serif` }}>
      {/* HEADER / NAVEGAÇÃO */}
      <header className="bg-card/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="flex items-center gap-3">
            <h1 className="text-lg md:text-2xl font-bold text-primary break-words max-w-[280px] sm:max-w-none leading-tight" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>
              {empresaInfo.nome}
            </h1>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {secoesAtivas.hero && <button onClick={() => scrollTo('inicio')} className="hover:text-primary transition-colors font-medium text-sm lg:text-base">Início</button>}
            {secoesAtivas.servicos && <button onClick={() => scrollTo('servicos')} className="hover:text-primary transition-colors font-medium text-sm lg:text-base">Serviços</button>}
            {secoesAtivas.sobre && <button onClick={() => scrollTo('sobre')} className="hover:text-primary transition-colors font-medium text-sm lg:text-base">Sobre</button>}
            {secoesAtivas.galeria && <button onClick={() => scrollTo('galeria')} className="hover:text-primary transition-colors font-medium text-sm lg:text-base">Galeria</button>}
            {secoesAtivas.faq && <button onClick={() => scrollTo('faq')} className="hover:text-primary transition-colors font-medium text-sm lg:text-base">FAQ</button>}
            {secoesAtivas.contato && <button onClick={() => scrollTo('contato')} className="hover:text-primary transition-colors font-medium text-sm lg:text-base">Contato</button>}
            <Button 
              className="rounded-full px-4 lg:px-6 text-sm lg:text-base"
              onClick={() => window.open(`https://wa.me/${empresaInfo.whatsapp}`, '_blank')}
            >
              <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
            </Button>
          </div>

          {/* Menu Mobile Toggle */}
          <button className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden bg-card border-t animate-in slide-in-from-top duration-300">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-3">
              {secoesAtivas.hero && <button onClick={() => scrollTo('inicio')} className="text-left py-3 text-base border-b border-border/50 hover:text-primary transition-colors">Início</button>}
              {secoesAtivas.servicos && <button onClick={() => scrollTo('servicos')} className="text-left py-3 text-base border-b border-border/50 hover:text-primary transition-colors">Serviços</button>}
              {secoesAtivas.sobre && <button onClick={() => scrollTo('sobre')} className="text-left py-3 text-base border-b border-border/50 hover:text-primary transition-colors">Sobre</button>}
              {secoesAtivas.galeria && <button onClick={() => scrollTo('galeria')} className="text-left py-3 text-base border-b border-border/50 hover:text-primary transition-colors">Galeria</button>}
              {secoesAtivas.faq && <button onClick={() => scrollTo('faq')} className="text-left py-3 text-base border-b border-border/50 hover:text-primary transition-colors">FAQ</button>}
              {secoesAtivas.contato && <button onClick={() => scrollTo('contato')} className="text-left py-3 text-base border-b border-border/50 hover:text-primary transition-colors">Contato</button>}
              <Button 
                className="w-full mt-3"
                onClick={() => window.open(`https://wa.me/${empresaInfo.whatsapp}`, '_blank')}
              >
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* SEÇÃO HERO */}
        {secoesAtivas.hero && (
          <section id="inicio" className="relative overflow-hidden bg-black flex items-center justify-center w-full">
            <img 
              src={hero.imagem} 
              alt={hero.titulo}
              className="w-full h-auto object-contain block" 
            />

        </section>
        )}

        {/* SEÇÃO SERVIÇOS */}
        {secoesAtivas.servicos && servicos.lista && servicos.lista.length > 0 && (
          <section id="servicos" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 break-words" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{servicos.tituloSecao}</h2>
                <div className="h-1.5 w-20 bg-primary mx-auto rounded-full mb-6" />
                {servicos.subtituloSecao && <p className="text-muted-foreground text-base md:text-lg break-words">{servicos.subtituloSecao}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {servicos.lista.map((s: any, i: number) => (
                  <Card key={i} className="group hover:shadow-2xl transition-all duration-300 border-none bg-card/50 backdrop-blur-sm h-full">
                    <CardContent className="pt-8 md:pt-10 pb-6 md:pb-8 px-6 md:px-8 text-center flex flex-col h-full">
                      {s.imagem ? (
                        <div className="w-full h-40 md:h-48 mb-6 rounded-xl overflow-hidden">
                          <img src={s.imagem} alt={s.titulo} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <span className="text-2xl md:text-3xl">{s.icone}</span>
                        </div>
                      )}
                      <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 break-words" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{s.titulo}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm md:text-base break-words">{s.descricao}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SEÇÃO SOBRE */}
        {secoesAtivas.sobre && (
          <section id="sobre" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
              <div className={`grid lg:grid-cols-2 gap-12 md:gap-16 items-center ${sobre.imagemPosicao === 'esquerda' ? 'lg:flex-row-reverse' : ''}`}>
                <div className={sobre.imagemPosicao === 'esquerda' ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}>
                  <div className="relative">
                    <img src={sobre.imagem} alt="Sobre Nós" className="rounded-2xl md:rounded-3xl shadow-2xl z-10 relative w-full" />
                    <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-24 h-24 md:w-32 md:h-32 bg-accent/20 rounded-full -z-0" />
                    <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-20 h-20 md:w-24 md:h-24 bg-primary/20 rounded-full -z-0" />
                  </div>
                </div>
                <div className={sobre.imagemPosicao === 'esquerda' ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 break-words" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{sobre.titulo}</h2>
                  <div className="prose prose-sm md:prose-lg max-w-none text-muted-foreground mb-8 md:mb-10 whitespace-pre-line text-sm md:text-base break-words">
                    {sobre.texto}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {sobre.diferenciais.map((d: any, i: number) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-xl shadow-sm">
                        <span className="text-xl md:text-2xl flex-shrink-0">{d.icone}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-semibold text-sm md:text-base block break-words">{d.titulo}</span>
                          {d.descricao && <span className="text-xs md:text-sm text-muted-foreground block mt-1 break-words">{d.descricao}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SEÇÃO DEPOIMENTOS */}
        {secoesAtivas.depoimentos && depoimentos.lista && depoimentos.lista.length > 0 && (
          <section className="py-16 md:py-24 bg-background overflow-hidden">
            <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{depoimentos.tituloSecao}</h2>
                {depoimentos.subtituloSecao && <p className="text-muted-foreground text-base md:text-lg">{depoimentos.subtituloSecao}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {depoimentos.lista.map((d: any, i: number) => (
                  <Card key={i} className="bg-card border-none shadow-lg relative">
                    <CardContent className="pt-10 md:pt-12 pb-6 md:pb-8 px-6 md:px-8">
                      <div className="absolute top-4 md:top-6 left-6 md:left-8 text-primary/20 text-5xl md:text-6xl font-serif">"</div>
                      <p className="text-base md:text-lg italic mb-6 relative z-10 break-words">{d.texto}</p>
                      <div className="flex items-center gap-4">
                        {d.foto && (
                          <img src={d.foto} alt={d.nome} className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-primary block text-sm md:text-base break-words">{d.nome}</span>
                          {d.cargo && <span className="text-xs md:text-sm text-muted-foreground block break-words">{d.cargo}</span>}
                        </div>
                        <div className="flex gap-1">
                          {[...Array(d.avaliacao)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SEÇÃO GALERIA */}
        {secoesAtivas.galeria && galeria.imagens && galeria.imagens.length > 0 && (
          <section id="galeria" className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{galeria.tituloSecao}</h2>
                {galeria.subtituloSecao && <p className="text-muted-foreground text-base md:text-lg">{galeria.subtituloSecao}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {galeria.imagens.map((img: any, i: number) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl shadow-lg aspect-square">
                    <img src={img.imagem} alt={img.titulo || `Imagem ${i + 1}`} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" />
                    {(img.titulo || img.descricao) && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6">
                        {img.titulo && <h3 className="text-white font-bold text-base md:text-lg mb-1 break-words">{img.titulo}</h3>}
                        {img.descricao && <p className="text-white/90 text-xs md:text-sm break-words">{img.descricao}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* SEÇÃO FAQ */}
        {secoesAtivas.faq && faq.perguntas && faq.perguntas.length > 0 && (
          <section id="faq" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{faq.tituloSecao}</h2>
                {faq.subtituloSecao && <p className="text-muted-foreground text-base md:text-lg">{faq.subtituloSecao}</p>}
              </div>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="space-y-4">
                  {faq.perguntas.map((item: any, i: number) => (
                    <AccordionItem key={i} value={`item-${i}`} className="bg-card rounded-xl px-6 border-none shadow-sm">
                      <AccordionTrigger className="text-left font-semibold hover:no-underline text-sm md:text-base py-4 md:py-5 break-words">
                        {item.pergunta}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 md:pb-5 break-words">
                        {item.resposta}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* SEÇÃO HORÁRIOS */}
        {secoesAtivas.horarios && horarios.dias && horarios.dias.length > 0 && (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{horarios.tituloSecao}</h2>
              </div>
              <div className="max-w-2xl mx-auto">
                <Card className="bg-card shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <div className="space-y-4">
                      {horarios.dias.map((dia: any, i: number) => (
                        <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-primary" />
                            <span className="font-semibold text-sm md:text-base">{dia.dia}</span>
                          </div>
                          <span className={`text-sm md:text-base ${dia.fechado ? 'text-muted-foreground' : 'text-primary font-medium'}`}>
                            {dia.horario}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* SEÇÃO LOCALIZAÇÃO */}
        {secoesAtivas.localizacao && (
          <section id="localizacao" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{localizacao.tituloSecao}</h2>
                {localizacao.subtituloSecao && <p className="text-muted-foreground text-base md:text-lg">{localizacao.subtituloSecao}</p>}
              </div>
              {localizacao.googleMapsUrl && (
                <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src={localizacao.googleMapsUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* SEÇÃO CONTATO */}
        {secoesAtivas.contato && (
          <section 
            id="contato" 
            className={`py-16 md:py-24 relative ${contato.estilo === 'colored' ? 'bg-primary text-primary-foreground' : contato.estilo === 'image' ? '' : 'bg-muted/30'}`}
          >
            {contato.estilo === 'image' && contato.imagemFundo && (
              <>
                <img 
                  src={contato.imagemFundo} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-contain" 
                />
                <div className="absolute inset-0 bg-black/70" />
              </>
            )}
            <div className={`container mx-auto px-4 ${contato.estilo === 'image' ? 'relative z-10 text-white' : ''}`} style={{ maxWidth: 'var(--max-width)' }}>
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 break-words" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{contato.titulo}</h2>
                <p className="text-lg md:text-xl opacity-90 break-words">{contato.subtitulo}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className={`flex flex-col items-center text-center p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm transition-colors ${contato.estilo === 'colored' ? 'bg-white/10 hover:bg-white/20' : 'bg-card hover:bg-card/80 shadow-lg'}`}>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 ${contato.estilo === 'colored' ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <Phone className={`w-5 h-5 md:w-6 md:h-6 ${contato.estilo === 'colored' ? '' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 break-words">Telefone</h3>
                  <p className="text-base md:text-lg break-words">{empresaInfo.telefone}</p>
                </div>
                <div className={`flex flex-col items-center text-center p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm transition-colors ${contato.estilo === 'colored' ? 'bg-white/10 hover:bg-white/20' : 'bg-card hover:bg-card/80 shadow-lg'}`}>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 ${contato.estilo === 'colored' ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <Mail className={`w-5 h-5 md:w-6 md:h-6 ${contato.estilo === 'colored' ? '' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 break-words">E-mail</h3>
                  <p className="text-base md:text-lg break-all">{empresaInfo.email}</p>
                </div>
                <div className={`flex flex-col items-center text-center p-6 md:p-8 rounded-2xl md:rounded-3xl backdrop-blur-sm transition-colors ${contato.estilo === 'colored' ? 'bg-white/10 hover:bg-white/20' : 'bg-card hover:bg-card/80 shadow-lg'}`}>
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-4 md:mb-6 ${contato.estilo === 'colored' ? 'bg-white/20' : 'bg-primary/10'}`}>
                    <MapPin className={`w-5 h-5 md:w-6 md:h-6 ${contato.estilo === 'colored' ? '' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 break-words">Endereço</h3>
                  <p className="text-base md:text-lg break-words">{empresaInfo.endereco}</p>
                </div>
              </div>
              <div className="mt-12 md:mt-16 text-center">
                <Button 
                  size="lg" 
                  variant={contato.estilo === 'colored' ? 'secondary' : 'default'}
                  className="rounded-full px-10 md:px-12 py-6 md:py-8 text-lg md:text-xl font-bold shadow-2xl hover:scale-105 transition-transform"
                  onClick={() => window.open(`https://wa.me/${empresaInfo.whatsapp}`, '_blank')}
                >
                  <MessageCircle className="mr-3 h-5 w-5 md:h-6 md:w-6" /> {contato.botaoTexto}
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-card py-12 md:py-16 border-t">
        <div className="container mx-auto px-4" style={{ maxWidth: 'var(--max-width)' }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 break-words" style={{ fontFamily: `var(--font-heading-family), sans-serif` }}>{empresaInfo.nome}</h2>
              <p className="text-muted-foreground max-w-xs text-sm md:text-base break-words">{empresaInfo.slogan}</p>
            </div>
            <div className="flex gap-4 md:gap-6">
              {empresaInfo.instagram && (
                <a href={`https://instagram.com/${empresaInfo.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Instagram className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {empresaInfo.facebook && (
                <a href={`https://facebook.com/${empresaInfo.facebook}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Facebook className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {empresaInfo.linkedin && (
                <a href={empresaInfo.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
              {empresaInfo.youtube && (
                <a href={empresaInfo.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 md:w-12 md:h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                  <Youtube className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              )}
            </div>
          </div>
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t text-center text-muted-foreground">
            <p className="text-sm md:text-base break-words">© {new Date().getFullYear()} {empresaInfo.nome}. Todos os direitos reservados.</p>
            <p className="mt-2 text-xs md:text-sm break-words">Desenvolvido com excelência para o seu negócio.</p>
          </div>
        </div>
      </footer>

      {/* Ícone Flutuante do WhatsApp */}
      <a
        href={`https://wa.me/${empresaInfo.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[9999] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="w-8 h-8 fill-current" />
        <span className="absolute right-full mr-3 bg-white text-gray-800 px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg whitespace-nowrap pointer-events-none border border-gray-100">
          Fale Conosco
        </span>
      </a>
    </div>
  );
}
