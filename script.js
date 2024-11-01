// Fonction pour vérifier si toutes les questions ont une réponse
function checkCompletion() {
    const form = document.getElementById('questionnaireForm');
    const questions = form.querySelectorAll('.question'); // Sélectionne chaque bloc de question
    const allAnswered = Array.from(questions).every(question => {
        const inputs = question.querySelectorAll('input[type="radio"]');
        return Array.from(inputs).some(input => input.checked);
    });

    // Active ou désactive le bouton en fonction des réponses
    document.getElementById('generatePDFButton').disabled = !allAnswered;
}

 // Fonction pour gérer le clic sur le bouton
 function handleButtonClick() {
    const button = document.getElementById('generatePDFButton');
    if (button.disabled) {
        alert("Veuillez répondre à toutes les questions avant de soumettre le formulaire.");
    } else {
        generatePDF(); // Appelle la fonction pour générer le PDF
    }
}

// Attache la fonction checkCompletion à chaque input radio
document.querySelectorAll('input[type="radio"]').forEach(input => {
    input.addEventListener('change', checkCompletion);
});

// Fonction pour afficher la série suivante
function showNextSerie(serieNumber) {
    // Vérifier si toutes les questions de la série actuelle sont répondues
    const currentSerie = document.getElementById(`serie${serieNumber - 1}`);
    if (!areAllQuestionsAnswered(currentSerie)) {
        alert("Veuillez répondre à toutes les questions avant de continuer.");
        return; 
    }

    // Masquer la série actuelle
    currentSerie.style.display = 'none';

    // Afficher la série demandée
    const nextSerie = document.getElementById(`serie${serieNumber}`);
    if (nextSerie) {
        nextSerie.style.display = 'block'; // Afficher la prochaine série

        // Faire défiler la page jusqu'au début du formulaire
        const form = document.getElementById('questionnaireForm');
        const formPosition = form.getBoundingClientRect().top + window.scrollY; // Obtenir la position du formulaire
        window.scrollTo({
            top: formPosition,
            behavior: 'smooth' 
        });
    }
}

// Fonction pour vérifier si toutes les questions de la série sont répondues
function areAllQuestionsAnswered(serie) {
    const questions = serie.querySelectorAll('.question');
    for (const question of questions) {
        const radios = question.querySelectorAll('input[type="radio"]');
        const isAnswered = Array.from(radios).some(radio => radio.checked);
        if (!isAnswered) {
            return false; // Toutes les questions ne sont répondues
        }
    }
    return true; // Toutes les questions sont répondues
}

function generatePDF() {
    // Récupérer les réponses
    const form = document.getElementById('questionnaireForm');
    const responses = form.querySelectorAll("input[type='radio']:checked");
    let communicationScore = 0;
    let concentrationScore = 0;
    let activationScore = 0;
    let stressScore = 0;
    let anxieteScore = 0;
    let confianceScore = 0;
    let motivationScore = 0;
    let emotionScore = 0;
    let estimedesoiScore = 0;
    let energieScore = 0;

    responses.forEach((response, index) => {
        let score = parseInt(response.value, 10);

        // Inversion du score pour certaines questions 
        if ([5,9,10,11,12,16,18,24,40,42,47,50,52,57,73,79,80,82,84,87].includes(index)) { // Les index sont décalés car ils commencent à 0
            score = 6 - score; // On inverse les scores des choixs possibles
        }
        
        // Distribution des scores dans les catégories
        if (index < 10) { 
            communicationScore += score; // Les 10 premières questions pour la communication
        } 
        else if (index >= 11 && index <= 20) {
            concentrationScore += score; // Les 10 questions pour la concentration
        }
        else if (index >= 21 && index <= 30) {
            activationScore += score; // Les 10 questions pour l'activation
        }
        else if (index >= 31 && index <= 35) {
            stressScore += score; // les 5 questions pour le stress
        }
        else if (index >= 36 && index <= 40) {
            anxieteScore += score;        //les 5 questions pour l'anxiété 
        }
        else if (index >= 41 && index <= 50) {
            confianceScore += score; // Les 10 questions pour la confiance
        }
        else if (index >= 51 && index <= 60) {
            motivationScore += score; // Les 10 questions pour la motivation
        }
        else if (index >= 61 && index <= 70) {
            emotionScore += score; // Les 10 questions pour l'émotion
        }
        else if (index >= 71 && index <= 80) {
            estimedesoiScore += score; // Les 10 questions pour l'estime de soi
        }
        else {
            energieScore+= score; // Les 10 dernières questions pour l'énergie
        }
    });

    // Évaluation pour la communication
    let communicationEvaluation;
    if (communicationScore >= 10 && communicationScore <= 20) {
        communicationEvaluation = `Niveau de communication faible. L’athlète a des difficultés à communiquer efficacement dans son environnement sportif. Il/elle peut éprouver de l’anxiété à l’idée de s’exprimer, ne pas écouter attentivement les autres ou avoir du mal à accepter des critiques. Cela peut nuire aux relations d’équipe et à la performance globale.`;
    } else if (communicationScore >= 21 && communicationScore <= 35) {
        communicationEvaluation = `Niveau de communication modéré. L’athlète communique de manière intermittente. Il/elle est capable de s’exprimer et d’écouter, mais peut avoir des difficultés dans certaines situations, comme la prise de parole en public ou la gestion des conflits. Un travail supplémentaire est nécessaire pour renforcer cette compétence.`;
    } else if (communicationScore >= 36 && communicationScore <= 50) {
        communicationEvaluation = `Niveau de communication élevé. L’athlète a une bonne capacité de communication. Il/elle s'exprime clairement, écoute attentivement et gère les critiques et les conflitsde manière constructive. Ce niveau favorise un bon climat d'équipe et des relations positives.`;
    }

    // Évaluation pour la concentration
    let concentrationEvaluation;
    if (concentrationScore >= 10 && concentrationScore <= 20) {
        concentrationEvaluation = `Niveau de concentration faible. L’athlète a des difficultés à se concentrer efficacement. Il/elle est souvent distrait(e) par des souvenirs passés ou par des préoccupations futures, ce qui peut nuire à ses performances.`;
    } else if (concentrationScore >= 21 && concentrationScore <= 35) {
        concentrationEvaluation = `Niveau de concentration modéré. L’athlète est capable de se concentrer dans certaines situations, mais il/elle peut encore être distrait(e) par des pensées sur le passé ou l’avenir. Un travail supplémentaire est nécessaire pour renforcer cette compétence.`;
    } else if (concentrationScore >= 36 && concentrationScore <= 50) {
        concentrationEvaluation = `Niveau de concentration élevé. L’athlète a une bonne capacité de concentration et sait se focaliser sur l’entraînement ou la compétition. Il/elle gère bien les distractions et utilise des techniques pour renforcer cette concentration.`;
    }

    // Évaluation pour l'activation
    let activationEvaluation;
    if (activationScore >= 10 && activationScore <= 20) {
        activationEvaluation = `Sous-activation. L'athlète n'est pas assez activé(e). Il/elle peut ressentir de la fatigue, du manque de motivation ou d’énergie. Il est nécessaire de stimuler l’activation physique et mentale avec des techniques comme un échauffement plus intense, des exercices de respiration énergisants ou de la musique motivante.`;
    } else if (activationScore >= 21 && activationScore <= 35) {
        activationEvaluation = `Activation optimale. L’athlète est dans un bon état d'activation. Il/elle est à la fois suffisamment énergisé(e)et calme, prêt(e) à performer à son meilleur niveau. Aucune modification majeure n’est nécessaire, mais il peut être utile de maintenir cette routine d'activation.`;
    } else if (activationScore >= 36 && activationScore <= 50) {
        activationEvaluation = `Sur-activation. L'athlète est trop activé(e). Il/elle peut ressentir de la nervosité excessive, du stress ou une agitation incontrôlable. Il est important de calmer l’activation, notamment à travers des exercices de relaxation, des respirations profondes, ou des visualisations apaisantes.`;
    }

    //Évaluation pour le stress
    let stressEvaluation;
    if (stressScore >= 5 && stressScore <= 10) {
        stressEvaluation = `Faible niveau de stress. L’athlète gère bien la pression liée aux situations immédiates, mais pourrait avoir besoin de plus de stimulation dans des situations de grande compétition.`;
    } else if (stressScore >= 11 && stressScore <= 17) {
        stressEvaluation = `Niveau de stress modéré. L’athlète ressent du stress dans les situations de pression, mais arrive à le gérer dans une certaine mesure. Il est possible d'améliorer la gestion de ce stress pour éviter que cela ne nuise à la performance.`;
    } else if (stressScore >= 18 && stressScore <= 25) {
        stressEvaluation = `Niveau de stress élevé. L’athlète subit une pression importante et a du mal à la gérer. Cela peut affecter la concentration, l’énergie et les performances. Il est nécessaire de travailler activement sur des stratégies de gestion du stress.`;
    }

    // Évaluation pour l'anxiété
    let anxieteEvaluation;
    if (anxieteScore >= 5 && anxieteScore <= 10) {
        anxieteEvaluation = `Faible niveau d'anxiété. L'athlète est détendu(e) et ne souffre pas d'inquiétudes persistantes concernant sa performance future ou passée. Cela indique une bonne gestion mentale.`;
    } else if (anxieteScore >= 11 && anxieteScore <= 17) {
        anxieteEvaluation = `Niveau d'anxiété modéré. L’athlète présente des inquiétudes régulières, mais ces dernières ne l’envahissent pas totalement. Il est toutefois important de les surveiller pour éviter qu'elles ne deviennent handicapantes.`;
    } else if (anxieteScore >= 18 && anxieteScore <= 25) {
        anxieteEvaluation = `Niveau d'anxiété élevé. L'athlète est souvent anxieux(se), même en dehors des moments de compétition. Cela peut causer de la fatigue mentale, de la perte de confiance et un impact négatif sur la motivation. Il est nécessaire de mettre en place un programme pour réduire cette anxiété.`;
    }

    // Évaluation pour la confiance
    let confianceEvaluation;
    if (confianceScore >= 10 && confianceScore <= 20) {
        confianceEvaluation = `Confiance en soi faible. L’athlète manque de confiance en ses compétences, ce qui peut sérieusement affecter ses performances sportives. Des doutes liés à des erreurs passées ou à l’incertitude concernant l’avenir dominent ses pensées, ce qui conduit à un manque de confiance dans le moment présent.`;
    } else if (confianceScore >= 21 && confianceScore <= 35) {
        confianceEvaluation = `Confiance en soi modérée. L'athlète a une confiance en soi moyenne. Il/elle peut être capable de s'appuyer sur ses réussites passées pour renforcer sa confiance actuelle, mais peut aussi parfois se laisser submerger par des doutes ou des inquiétudes sur l'avenir.`;
    } else if (confianceScore >= 36 && confianceScore <= 50) {
        confianceEvaluation = `Confiance en soi élevé. L'athlète a une grande confiance en ses capacités. Il/elle utilise ses réussites passées pour renforcer sa confiance dans le présent et a une vision optimiste de l'avenir. Cela favorise une prise de décision rapide et un engagement total dans les performances.`;
    }   

    //Évaluation pour la motivation
    let motivationEvaluation;
    if (motivationScore >= 10 && motivationScore <= 20) {
        motivationEvaluation = `Motivation faible. L’athlète présente un faible niveau de motivation, avec un sentiment de démotivation lié aux expériences passées, aux difficultés présentes et aux perspectives d’avenir. Cela peut affecter son engagement sportif et sa progression.`;
    } else if (motivationScore >= 21 && motivationScore <= 35) {
        motivationEvaluation = `Motivation modérée. L'athlète possède une motivation intermédiaire. Il/elle parvient à rester engagé(e) mais peut être parfois découragé(e) par les difficultés ou l’ampleur des objectifs futurs. Des stratégies d’ajustement peuvent être mises en place pour soutenir cette motivation.`;
    } else if (motivationScore >= 36 && motivationScore <= 50) {
        motivationEvaluation = `Motivation élevé. L’athlète a un niveau élevé de motivation, se fixant des objectifs ambitieux et trouvant du plaisir dans la pratique quotidienne. Sa motivation est équilibrée entre plaisir personnel (intrinsèque) et objectifs de résultats (extrinsèque).`;
    }

    //Évaluation pour l'émotion
    let emotionEvaluation;
    if (emotionScore >= 10 && emotionScore <= 20) {
        emotionEvaluation = `Bon contrôle émotionnel. L'athlète semble capable de bien gérer ses émotions. Il/elle peut continuer à entretenir ces compétences en maintenant les bonnes pratiques et en se préparant à des défis émotionnels ponctuels.`;
    } else if (emotionScore >= 21 && emotionScore <= 30) {
        emotionEvaluation = `Gestion émotionnelle modérée, quelques difficultés présentes. L'athlète a des moments où les émotions peuvent le/la déstabiliser, mais dans l'ensemble, il/elle gère assez bien. Il serait judicieux d'améliorer la gestion du stress et de développer des stratégies pour faire face aux moments critiques (techniques de relaxation, auto-discours positif).`;
    } else if (emotionScore >= 31 && emotionScore <= 40) {
        emotionEvaluation = `Problèmes émotionnels fréquents affectant la performance. Ce score indique des difficultés importantes à gérer les émotions, qui peuvent nuire aux performances. Il est recommandé de renforcer les compétences mentales à travers des exercices de pleine conscience, des routines pré-compétition et des techniques de gestion de la frustration.`;
    } else if (emotionScore >= 41 && emotionScore <= 50) {
        emotionEvaluation = `Gestion émotionnelle déficiente, impact significatif sur la performance. L'athlète a probablement un besoin urgent d’accompagnement pour développer une meilleure gestion des émotions. Un travail avec un psychologue du sport est conseillé, ainsi que la mise en place de stratégies rigoureuses pour contrôler les émotions avant qu'elles n'affectent trop gravement la performance et les relations.`;
    }

    //Évaluation pour l'estime de soi
    let estimedesoiEvaluation;
    if (estimedesoiScore >= 10 && estimedesoiScore <= 20) {
        estimedesoiEvaluation = `Estime de soi faible. L’athlète a une estime de soi globalement basse dans le cadre sportif. Il/elle doute souvent de ses compétences, a tendance à se comparer de manière défavorable aux autres, et peut avoir du mal à rebondir après des échecs. Ce manque de confiance peut limiter ses performances et son développement personnel.`;
    } else if (estimedesoiScore >= 21 && estimedesoiScore <= 35) {
        estimedesoiEvaluation = `Estime de soi modérée. L'athlète a une estime de soi globalement correcte, mais présente parfois des doutes, surtout dans les moments de pression ou après des échecs. Il/elle a la capacité de se sentir confiant(e), mais peut être affecté(e) par les comparaisons sociales ou les critiques extérieures.`;
    } else if (estimedesoiScore >= 36 && estimedesoiScore <= 50) {
        estimedesoiEvaluation = `Estime de soi élevé. L'athlète a une bonne estime de soi. Il/elle se sent compétent(e), confiant(e), et fait face aux défis avec assurance. Il/elle est capable d’accepter les échecs et de les utiliser pour progresser. Les réussites sont bien intégrées, et l’athlète se sent généralement à la hauteur de ses objectifs.`;
    }

    //Évaluation pour l'énergie
    let energieEvaluation;
    if (energieScore >= 10 && energieScore <= 20) {
        energieEvaluation = `Niveau d'énergie faible. L'athlète semble avoir des difficultés à maintenir un bon niveau d’énergie, que ce soit en raison de la fatigue accumulée, d'un manque de récupération ou d'une mauvaise gestion de l’énergie au quotidien.`;
    } else if (energieScore >= 21 && energieScore <= 35) {
        energieEvaluation = `Niveau d'énergie modéré. L'athlète parvient généralement à maintenir un bon niveau d’énergie, mais peut connaître des fluctuations dues à la fatigue, au stress ou à une récupération insuffisante. Il/elle doit travailler sur la régularité de la gestion de son énergie.`;
    } else if (energieScore >= 36 && energieScore <= 50) {
        energieEvaluation = `Niveau d'energie élevé. L'athlète affiche un niveau d’énergie élevé, lui permettant de maintenir des performances optimales et de récupérer rapidement après les efforts. Cela reflète une gestion efficace de l’énergie au quotidien, ainsi qu'une préparation physique et mentale adaptée.`;
    }


    const colors = {
        communication: '#FF40FF', 
        concentration: '#B3C6E6',  
        activation: '#E97132',      
        stress: '#BFBFBF',          
        anxiete: '#BFBFBF',         
        confiance: '#F7C7AC',       
        motivation: '#FFC000',      
        emotion: '#FF0000',         
        estimedesoi: '#0070C0',     
        energie: '#4EA72E'          
    };

    // Génération du PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [210, 850]  // Dimensions choisis pour le pdf en une seul page
    });

    doc.setFont("helvetica", "bold"); // Définit la police en gras pour le titre

    const title = "Résultats du Questionnaire MENSSANA";
    const pageWidth = doc.internal.pageSize.getWidth();
    const titleX = (pageWidth - doc.getTextWidth(title)) / 2; // Calcul du centrage
    doc.text(title, titleX, 20);

    doc.setFont("helvetica", "normal"); // Definit la police normale

    // Fonction pour dessiner le texte avec un fond coloré
    function drawTextWithBackground(y, label, score, evaluation, color) {
        // Dessiner le rectangle
        doc.setFillColor(color);
        doc.rect(5, y - 10, 200, 75, 'F'); // Rectangle avec remplissage
        doc.setTextColor(0); // Texte noir
        doc.setFont("helvetica", "bold");
        const fullText = `${label} : ${score}`;

        // Calculer la position X pour centrer le texte "label : score"
        const textWidth = doc.getTextWidth(fullText);
        const centeredX = (pageWidth - textWidth) / 2;
        doc.text(fullText, centeredX, y); // Afficher le texte centré
        doc.setFont("helvetica", "normal");

        // Diviser l'évaluation en lignes et centrer chaque ligne
        let lines = doc.splitTextToSize(evaluation, 180);
        let currentY = y + 10;
        lines.forEach(line => 
            {
            const lineWidth = doc.getTextWidth(line);
            const lineX = (pageWidth - lineWidth) / 2; // Calculer la position X pour chaque ligne centrée
            doc.text(line, lineX, currentY);
            currentY += 10; // Ajuster l'espace entre les lignes
            });
    }

    // Affiche l'évaluation de communication
    drawTextWithBackground(40,"Score de communication" ,communicationScore, communicationEvaluation, colors.communication);

    // Affiche l'évaluation de concentration
    drawTextWithBackground(120,"Score de concentration" ,concentrationScore, concentrationEvaluation, colors.concentration);

    // Affiche l'évaluation d'activation
    drawTextWithBackground(200,"Score d'activation", activationScore, activationEvaluation, colors.activation);

    // Affiche l'évaluation de stress
    drawTextWithBackground(280,"Score de stress", stressScore, stressEvaluation, colors.stress);

    // Affiche l'évaluation d'anxiété
    drawTextWithBackground(360,"Score d'anxiété", anxieteScore, anxieteEvaluation, colors.anxiete);

    // Affiche l'évaluation de confiance
    drawTextWithBackground(440,"Score de confiance", confianceScore, confianceEvaluation, colors.confiance);

    // Affiche l'évaluation de motivation
    drawTextWithBackground(520,"Score de motivation", motivationScore, motivationEvaluation, colors.motivation);

    // Affiche l'évaluation d'émotion
    drawTextWithBackground(600,"Score d'émotion", emotionScore, emotionEvaluation, colors.emotion);

    // Affiche l'évaluation d'estime de soi
    drawTextWithBackground(680,"Score d'estime de soi", estimedesoiScore, estimedesoiEvaluation, colors.estimedesoi);

    // Affiche l'évaluation d'énergie
    drawTextWithBackground(760,"Score d'énergie", energieScore, energieEvaluation, colors.energie);

    /*pour ajouter l'image dans le pdf, il faut mettre son code base64
    // Ajoutez l'image à la fin du PDF
    const imgData = 'fin_pdf.png;base64,'; // Après la virgule mettre le code base64 de l'image

    // Ajoutez l'image (x, y, largeur, hauteur)
    doc.addImage(imgData, 'PNG', 10, 800, 190, 100); // Ajustez les coordonnées et les dimensions selon vos besoins
    */

    // Téléchargement du PDF
    doc.save("rapport_test_personnalite_menssana.pdf");
}
