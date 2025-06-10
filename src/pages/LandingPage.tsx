
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Users, Calendar, MessageSquare, Shield, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Calendar,
      title: "Gestion de Projets",
      description: "Planifiez, organisez et suivez vos projets avec des outils intuitifs et puissants.",
      features: ["Calendrier interactif", "Diagrammes de Gantt", "Suivi d'avancement", "Alertes automatiques"]
    },
    {
      icon: Users,
      title: "Collaboration d'Équipe",
      description: "Travaillez ensemble efficacement avec des outils de collaboration avancés.",
      features: ["Espaces de travail partagés", "Attribution de tâches", "Gestion des rôles", "Tableaux de bord personnalisés"]
    },
    {
      icon: MessageSquare,
      title: "Communication Intégrée",
      description: "Centralisez toutes vos communications projet en un seul endroit.",
      features: ["Messagerie temps réel", "Commentaires sur tâches", "Notifications intelligentes", "Historique complet"]
    },
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Protégez vos données avec des contrôles d'accès granulaires par rôles.",
      features: ["Authentification sécurisée", "Permissions par rôle", "Audit trail", "Sauvegarde automatique"]
    }
  ];

  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Chef de Projet",
      company: "TechCorp",
      content: "ProManage a transformé notre façon de gérer les projets. L'interface est intuitive et les fonctionnalités correspondent exactement à nos besoins.",
      rating: 5
    },
    {
      name: "Pierre Martin",
      role: "Directeur IT",
      company: "InnovSoft",
      content: "Excellente solution pour coordonner nos équipes. Le suivi en temps réel et les notifications nous font gagner un temps précieux.",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "29€",
      period: "/mois",
      description: "Parfait pour les petites équipes",
      features: [
        "Jusqu'à 10 utilisateurs",
        "5 projets simultanés",
        "Support email",
        "Stockage 5GB"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "59€",
      period: "/mois",
      description: "Idéal pour les entreprises en croissance",
      features: [
        "Jusqu'à 50 utilisateurs",
        "Projets illimités",
        "Support prioritaire",
        "Stockage 50GB",
        "Rapports avancés"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Sur devis",
      period: "",
      description: "Solutions personnalisées",
      features: [
        "Utilisateurs illimités",
        "Infrastructure dédiée",
        "Support 24/7",
        "Stockage illimité",
        "Intégrations personnalisées"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ProManage
                </h1>
                <p className="text-xs text-gray-500">Gestion de projets</p>
              </div>
            </div>
            <Button onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Se connecter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-purple-100 text-purple-800 border-purple-200">
            <Zap className="w-3 h-3 mr-1" />
            Solution complète de gestion de projets
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transformez votre façon de
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> gérer vos projets</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            ProManage offre une solution complète pour planifier, organiser et suivre vos projets. 
            Collaborez efficacement avec votre équipe et atteignez vos objectifs plus rapidement.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => navigate('/login')} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              Voir la démo
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez comment ProManage peut révolutionner votre gestion de projets
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="p-8 hover:shadow-lg transition-shadow border-0 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4">{service.description}</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
            <p className="text-lg text-gray-600">Découvrez pourquoi les équipes nous font confiance</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 border-0 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role} - {testimonial.company}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tarifs simples et transparents</h2>
            <p className="text-lg text-gray-600">Choisissez la formule qui correspond à vos besoins</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`p-8 relative border-0 shadow-sm ${plan.popular ? 'ring-2 ring-purple-500' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600">
                    Plus populaire
                  </Badge>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  {plan.name === "Enterprise" ? "Nous contacter" : "Commencer"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <h3 className="text-xl font-bold">ProManage</h3>
              </div>
              <p className="text-gray-400">
                La solution complète pour gérer vos projets et collaborer efficacement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Fonctionnalités</li>
                <li>Tarifs</li>
                <li>Documentation</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>Formation</li>
                <li>Statut</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400">
                <li>À propos</li>
                <li>Blog</li>
                <li>Carrières</li>
                <li>Partenaires</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProManage. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
