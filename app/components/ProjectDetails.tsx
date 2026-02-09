import { useState } from "react";
import { Link } from "react-router";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ProjectDetailProps {
  project: {
    title: string;
    description: string;
    room_name: string;
    project_date: string;
    images: string[];
  };
}

export function ProjectDetailView({ project }: ProjectDetailProps) {
  // -1 means closed, any other number is the index of the image being viewed
  const [index, setIndex] = useState(-1);

  // Lightbox needs an array of objects: [{ src: 'url1' }, { src: 'url2' }]
  const slides = project.images.map((url) => ({ src: url }));

  return (
    <div className="container py-5 text-white animate-fade-in">
      {/* 1. Header & Navigation */}
      <Link to="/" className="btn btn-outline-light mb-4 shadow-sm">
        ← Tilbage til oversigt
      </Link>

      <div className="row g-5">
        {/* 2. Left Side: Title & Description */}
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold mb-4">{project.title}</h1>
          
          <div className="description-box p-4 bg-darkblue rounded shadow-sm mb-5">
            <h3 className="h5 text-primary mb-3 border-bottom border-primary pb-2">Beskrivelse</h3>
            <p className="lead opacity-75" style={{ whiteSpace: 'pre-line' }}>
              {project.description}
            </p>
          </div>
        </div>

        {/* 3. Right Side: Meta Info Box */}
        <div className="col-lg-4">
          <div className="sticky-top" style={{ top: '2rem' }}>
            <div className="bg-darkblue p-4 rounded shadow border border-secondary/20">
              <h4 className="h5 border-bottom border-secondary pb-2 mb-3">Projekt Detaljer</h4>
              <div className="mb-3">
                <label className="small text-secondary d-block">Udført den:</label>
                <span className="fw-bold">
                  {new Date(project.project_date).toLocaleDateString('da-DK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div>
                <label className="small text-secondary d-block">Rum / Kategori:</label>
                <span className="room-pill d-inline-block mt-1">{project.room_name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Gallery Section */}
      <div className="mt-5">
        <h3 className="h3 mb-4">Projekt Galleri</h3>
        <div className="row g-3">
          {project.images.map((url, i) => (
            <div key={i} className="col-md-4 col-sm-6">
              <div 
                className="gallery-img-container shadow rounded overflow-hidden"
                style={{ cursor: "pointer" }}
                onClick={() => setIndex(i)} // Opens lightbox at this image
              >
                <img 
                  src={url} 
                  className="img-fluid" 
                  alt={`${project.title} - billede ${i + 1}`} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. The Actual Pop-up Viewer */}
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
}