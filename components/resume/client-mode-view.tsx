"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Star, Clock, DollarSign, Mail, CheckCircle2, Code2, Zap } from "lucide-react"
import Image from "next/image"
import type { PersonalInfo, Experience, Education, Skill, Project, Service, Testimonial } from "./resume-view"
import { ContactForm } from "./contact-form"

const iconMap = {
  Briefcase,
  Star,
  Clock,
  DollarSign,
  Mail,
  CheckCircle2,
  Code2,
  Zap,
}

const serviceIconColors = ["text-blue-500", "text-green-500", "text-purple-500", "text-yellow-500", "text-red-500", "text-indigo-500"]

interface ClientModeViewProps {
  personalInfo: PersonalInfo | null
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  services: Service[]
  testimonials: Testimonial[]
  onViewModeChange: (viewMode: ViewMode) => void
}

export function ClientModeView({ personalInfo, experiences, education, skills, projects, services, testimonials, onViewModeChange }: ClientModeViewProps) {
  const featuredProjects = projects
    .filter((p) => p.is_featured)
    .slice(0, 3)
    .map((project) => ({
      title: project.title,
      description: project.description,
      image: project.image_url || "/project-management-team.png",
      technologies: project.technologies?.slice(0, 3) || [],
    }))

  const stats = [
    { icon: Briefcase, label: "Projects Completed", value: `${projects.length}+` },
    { icon: Star, label: "Client Satisfaction", value: personalInfo?.client_satisfaction || "4.9/5" },
    { icon: Clock, label: "Avg. Response Time", value: personalInfo?.avg_response_time || "< 2hrs" },
    { icon: DollarSign, label: "Starting From", value: personalInfo?.starting_rate || "$75/hr" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-12 md:space-y-20"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-4 md:space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-2 border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4" />
          <span className="text-sm font-medium">Available for Projects</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-balance">Let's Build Something Amazing Together</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
          {personalInfo?.bio ||
            "Full-stack developer specializing in scalable web applications. Helping businesses transform ideas into high-performance digital products."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
            <a href={personalInfo?.email ? `mailto:${personalInfo.email}` : "#"}>
              <Mail className="h-4 w-4" />
              Start a Project
            </a>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={() => onViewModeChange("normal")}>
            View Portfolio
          </Button>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="pt-6 text-center">
              <stat.icon className={`h-7 w-7 md:h-8 md:w-8 mx-auto mb-2 text-primary`} />
              <div className="text-xl md:text-2xl font-bold">{stat.value}</div>
              <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.section>

      {/* Services */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-8 md:space-y-12"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Services I Offer</h2>
          <p className="text-muted-foreground">Comprehensive solutions tailored to your needs</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Code2
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <Icon className={`h-10 w-10 mb-4 ${serviceIconColors[index % serviceIconColors.length]}`} />
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.deliverables?.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <motion.section
          id="featured-work"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="space-y-8 md:space-y-12"
        >
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Featured Work</h2>
            <p className="text-muted-foreground">Recent projects that delivered real results</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="space-y-8 md:space-y-12"
      >
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">What Clients Say</h2>
          <p className="text-muted-foreground">Trusted by businesses worldwide</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + index * 0.1 }}
            >
              <Card className="h-full bg-gray-50 dark:bg-gray-800/20 border-l-4 border-primary">
                <CardHeader>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <CardDescription className="text-base italic">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="text-center space-y-6 py-12"
      >
        <h2 className="text-3xl font-bold">Ready to Start Your Project?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Let's discuss how I can help bring your vision to life. Free consultation for all new projects.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
            <a href={personalInfo?.email ? `mailto:${personalInfo.email}` : "#"}>
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
          </Button>
          <ContactForm />
        </div>
      </motion.section>
    </motion.div>
  )
}
