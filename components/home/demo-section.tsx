import { Brain } from "lucide-react";
import { MotionDiv, MotionH3 } from "../common/motion-wrapper";
import SummaryViewer from "../summaries/summary-viewer";

const DEMO_Summary = `# Docker Mastery: From Beginner to Expert
• 🎯 Comprehensive Docker course covering everything from container basics to production orchestration

# Document Details
• 📄 Type: DevOps & Development Tool
• 👥 For: Developers, DevOps Engineers & System Administrators

# Core Concepts & Installation
• 🎯 Understanding containers vs virtual machines
• 🔧 Docker Desktop setup for Windows/Mac/Linux
• 📦 Docker Hub account creation and configuration
• 🛠️ Verifying installation with docker --version

# Container Fundamentals
• 🎯 Running your first container with docker run
• 📝 Managing container lifecycle (start, stop, remove)
• 🔍 Viewing running containers and their status
• 💾 Working with container logs and debugging

# Building Docker Images
• 🎯 Creating Dockerfiles with best practices
• 📁 Understanding layered architecture and caching
• 🏷️ Tagging images properly for version control
• 🧹 Multi-stage builds for production optimization

# Docker Compose Essentials
• 🎯 Defining multi-container applications
• 🔗 Setting up service dependencies and networking
• 🌐 Configuring volumes for persistent data
• ⚙️ Environment variables and configuration management

# Networking & Storage
• 🎯 Docker networking models (bridge, host, overlay)
• 🔌 Creating custom networks for services
• 💿 Volume types: named, anonymous, and bind mounts
• 📊 Managing data with volumes and backups

# Advanced Orchestration
• 🎯 Introduction to Docker Swarm concepts
• 👥 Setting up and managing Swarm clusters
• ⚖️ Service scaling and load balancing
• 🔄 Rolling updates and service health checks

# Security & Best Practices
• 🎯 Implementing least privilege principles
• 🔐 Managing secrets and sensitive data
• 🧹 Image scanning for vulnerabilities
• 📝 Creating non-root user containers

# Production Deployment
• 🎯 Integrating with CI/CD pipelines
• 🌐 Cloud deployment strategies (AWS, Azure, GCP)
• 📈 Monitoring containers with logging solutions
• 🔄 Blue-green deployment patterns for zero downtime
`;

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0  
        -z-10 transform-gpu overflow-hidden blur-3xl "
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-1155/678
            w-[36.125rem] -translate-x-1/2 
            bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500
            opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: `polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.25% 0.1%,
                 88.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 
                 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%,
                  27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)`,
            }}
          />
        </div>
        <div className="flex flex-col items-center text-center space-y-4">
          <div
            className="inline-flex items-center justify-center p-2
           rounded-2xl bg-gray-100/80 backdrop-blur-xs
            border border-gray-500/20 mb-4 "
          >
            <Brain className="w-6 h-6 text-rose-500" />
          </div>
          <div className="text-center mb-16">
            <MotionH3
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6"
            >
              This is how Briefly transform a{" "}
              <span
                className="bg-linear-to-r from-rose-500 to-rose-700
              bg-clip-text text-transparent"
              >
                Document PDF
              </span>{" "}
              into an easy-to-read summary!
            </MotionH3>
          </div>
        </div>
        <div className="flex justify-center items-center px-2 sm:px-4 lg:px-6">
          <MotionDiv
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SummaryViewer summary={DEMO_Summary} />
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
