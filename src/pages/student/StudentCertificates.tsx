import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, ExternalLink } from 'lucide-react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import jsPDF from 'jspdf';

interface Certificate {
  id: string;
  examTitle: string;
  issuedDate: string;
  score: number;
  verificationUrl: string;
  instructorName: string;
  duration: string;
}

export default function StudentCertificates() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const certificates: Certificate[] = [
    {
      id: 'CERT-2025-001',
      examTitle: 'Advanced React Development',
      issuedDate: '2025-11-15',
      score: 95,
      verificationUrl: 'https://skillforge.com/verify/CERT-2025-001',
      instructorName: 'Dr. Sarah Johnson',
      duration: '8 weeks'
    },
    {
      id: 'CERT-2025-002',
      examTitle: 'Data Structures & Algorithms',
      issuedDate: '2025-11-10',
      score: 92,
      verificationUrl: 'https://skillforge.com/verify/CERT-2025-002',
      instructorName: 'Prof. Michael Chen',
      duration: '10 weeks'
    },
    {
      id: 'CERT-2025-003',
      examTitle: 'Machine Learning Fundamentals',
      issuedDate: '2025-11-05',
      score: 94,
      verificationUrl: 'https://skillforge.com/verify/CERT-2025-003',
      instructorName: 'Dr. Emily Rodriguez',
      duration: '12 weeks'
    },
  ];

  const handleDownloadCertificate = (cert: Certificate) => {
    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Certificate background
      doc.setFillColor(248, 250, 252); // Light gray background
      doc.rect(0, 0, 297, 210, 'F');

      // Certificate border
      doc.setDrawColor(59, 130, 246); // Blue border
      doc.setLineWidth(3);
      doc.rect(10, 10, 277, 190);

      // Inner decorative border
      doc.setDrawColor(147, 197, 253); // Light blue
      doc.setLineWidth(1);
      doc.rect(20, 20, 257, 170);

      // Header decoration
      doc.setFillColor(59, 130, 246); // Blue header
      doc.rect(20, 20, 257, 25, 'F');

      // Logo placeholder
      doc.setFillColor(255, 255, 255);
      doc.circle(40, 32.5, 8, 'F');
      doc.setTextColor(59, 130, 246);
      doc.setFontSize(14);
      doc.setFont(undefined, 'bold');
      doc.text('SF', 40, 35, { align: 'center' });

      // Certificate title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont(undefined, 'bold');
      doc.text('CERTIFICATE OF COMPLETION', 148.5, 37, { align: 'center' });

      // Subtitle
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.setFont(undefined, 'normal');
      doc.text('This certifies that', 148.5, 55, { align: 'center' });

      // Student name
      const studentName = user?.name || 'Student Name';
      doc.setFontSize(24);
      doc.setTextColor(15, 23, 42);
      doc.setFont(undefined, 'bold');
      doc.text(studentName, 148.5, 70, { align: 'center' });

      // Achievement text
      doc.setFontSize(14);
      doc.setTextColor(71, 85, 105);
      doc.setFont(undefined, 'normal');
      doc.text('has successfully completed the course', 148.5, 85, { align: 'center' });

      // Course title
      doc.setFontSize(18);
      doc.setTextColor(15, 23, 42);
      doc.setFont(undefined, 'bold');
      doc.text(cert.examTitle, 148.5, 95, { align: 'center' });

      // Performance details
      doc.setFontSize(12);
      doc.setTextColor(71, 85, 105);
      doc.setFont(undefined, 'normal');
      doc.text(`with a score of ${cert.score}%`, 148.5, 110, { align: 'center' });

      // Additional details
      doc.setFontSize(10);
      doc.text(`Duration: ${cert.duration}`, 148.5, 120, { align: 'center' });
      doc.text(`Instructor: ${cert.instructorName}`, 148.5, 128, { align: 'center' });

      // Issue date
      const date = new Date(cert.issuedDate).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      doc.setFontSize(12);
      doc.text(`Issued on ${date}`, 148.5, 140, { align: 'center' });

      // Certificate ID
      doc.setFontSize(10);
      doc.setTextColor(148, 160, 188);
      doc.text(`Certificate ID: ${cert.id}`, 148.5, 155, { align: 'center' });

      // Verification instructions
      doc.setFontSize(8);
      doc.text('Verify authenticity at:', 148.5, 165, { align: 'center' });
      doc.setFontSize(9);
      doc.setTextColor(59, 130, 246);
      doc.text(cert.verificationUrl, 148.5, 170, { align: 'center' });

      // Signature area
      doc.setLineWidth(0.5);
      doc.setDrawColor(200, 200, 200);
      doc.line(200, 175, 260, 175);
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text('Authorized Signature', 230, 180, { align: 'center' });
      
      // Add signature text
      doc.setFontSize(10);
      doc.setTextColor(15, 23, 42);
      doc.text(cert.instructorName, 230, 178, { align: 'center' });

      // QR Code placeholder
      doc.setFillColor(220, 220, 220);
      doc.rect(265, 165, 15, 15, 'F');
      doc.setFontSize(7);
      doc.setTextColor(100, 100, 100);
      doc.text('QR', 272.5, 173, { align: 'center' });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 160, 188);
      doc.text('© 2025 SkillForge. All rights reserved.', 148.5, 200, { align: 'center' });

      // Save the PDF
      const fileName = `Certificate_${cert.examTitle.replace(/\s+/g, '_')}_${cert.id}.pdf`;
      doc.save(fileName);

      toast({
        title: "Certificate Downloaded",
        description: "Your certificate has been downloaded successfully!",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error generating certificate:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating the certificate. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleVerifyCertificate = (cert: Certificate) => {
    window.open(cert.verificationUrl, '_blank');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold">My Certificates</h2>
          <p className="text-muted-foreground mt-2">Your earned certificates and achievements</p>
        </div>

        <div className="grid gap-4">
          {certificates.map((cert) => (
            <Card key={cert.id} className="border-success/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                      <Award className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <CardTitle>{cert.examTitle}</CardTitle>
                      <CardDescription className="mt-1">
                        Certificate ID: {cert.id}
                      </CardDescription>
                      <CardDescription>
                        Instructor: {cert.instructorName}
                      </CardDescription>
                      <CardDescription>
                        Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-success">{cert.score}%</div>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => handleDownloadCertificate(cert)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleVerifyCertificate(cert)}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Verify Certificate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {certificates.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
              <p className="text-muted-foreground mb-4">
                Complete exams with a score of 90% or higher to earn certificates
              </p>
              <Button>View Available Exams</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}